import { connectDB } from "@/lib/db/connectDB";
import { userModel } from "@/lib/models/user";

export async function POST(request) {
  try {
    await connectDB();

    const { email, otp } = await request.json();

    const decodedEmail = decodeURIComponent(email);
    const user = await userModel.findOne({ email: decodedEmail });

    if (!user) {
      return Response.json(
        {
          msg: "User not found",
          err: "No user found with this email",
        },
        { status: 500 }
      );
    }

    const isOtpValid = user.otp === otp;
    const isOtpNotExpired = new Date(user.otpExpiry) > new Date();

    if (isOtpValid && isOtpNotExpired) {
      user.isVerified = true;
      await user.save();
      return Response.json(
        {
          msg: "Account verified successfully",
          user: user,
        },
        { status: 200 }
      );
    } else if (!isOtpNotExpired) {
      return Response.json(
        {
          msg: "Failed to verify otp",
          err: "Otp has expired",
        },
        { status: 500 }
      );
    } else {
      return Response.json(
        {
          msg: "Failed to verify otp",
          err: "Otp is not valid",
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Error verifying otp =>", err);
    return Response.json(
      {
        msg: "Failed to send verify otp",
        err: err,
      },
      { status: 500 }
    );
  }
}
