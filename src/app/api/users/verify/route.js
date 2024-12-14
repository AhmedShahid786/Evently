import { connectDB } from "@/lib/db/connectDB";
import { userModel } from "@/lib/models/user";

export async function POST(request) {
  try {
    await connectDB();

    const { id, otp } = await request.json();

    const user = await userModel.findOne({ _id: id });

    if (!user) {
      return Response.json(
        {
          msg: "User not found",
          err: "No user found with this email",
        },
        { status: 404 }
      );
    }

    const isOtpValid = parseInt(user.otp) === parseInt(otp);
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
          err: "Entered OTP has been expired. Please request another otp.",
        },
        { status: 500 }
      );
    } else {
      return Response.json(
        {
          msg: "Failed to verify otp",
          err: "The entered OTP is not correct. Please try again.",
        },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Error verifying otp =>", err);
    return Response.json(
      { msg: "Failed to process your request.", err: "Internal Server Error" },
      { status: 500 }
    );
  }
}
