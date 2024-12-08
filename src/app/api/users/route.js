import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/db/connectDB";
import { userModel } from "@/lib/models/user";
import { sendVerificationEmail } from "@/actions/email";

export async function GET(request) {
  await connectDB();
  const users = await userModel.find();
  return Response.json(
    {
      msg: "Users Fetched Successfully",
      users: users,
    },
    { status: 200 }
  );
}

export async function POST(request) {
  try {
    await connectDB();
    let newUser;
    const { email, password } = await request.json();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const existingUserByEmail = await userModel.findOne({ email: email });

    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json(
          {
            msg: "Failed to signup user",
            err: "User with this email already exists",
          },
          { status: 500 }
        );
      } else {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.otp = otp;
        existingUserByEmail.otpExpiry = new Date(Date.now() + 3600000);

        await existingUserByEmail.save();

        return Response.json(
          {
            msg: "Unverified user exist, email sent successfully",
            user: existingUserByEmail,
          },
          { status: 500 }
        );
      }
    } else {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const expiryDate = new Date();

      newUser = new userModel({
        email: email,
        password: hashedPassword,
        otp: otp,
        otpExpiry: expiryDate,
      });
      await newUser.save();
    }

    const sentEmail = await sendVerificationEmail(email, otp);

    return Response.json(
      {
        msg: "User registered and verification email sent successfully",
        user: newUser,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error in signing up user =>", err);
    return Response.json(
      {
        msg: "Error in signing up user",
        err: err,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request) {}

export async function DELETE(request) {}

// var token = jwt.sign(
//   { _id: newUser._id, role: newUser.role },
//   process.env.JWT_KEY
// );

// profileImg: userObj.picture,
// fullname: userObj.name,
