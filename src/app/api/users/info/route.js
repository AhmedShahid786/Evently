import { connectDB } from "@/lib/db/connectDB";
import { userModel } from "@/lib/models/user";

export async function POST(request) {
  try {
    await connectDB();

    const { id, fullname, bio, profileImg } = await request.json();

    const user = await userModel.findOne({ _id: id });

    if (!user) {
      return Response.json(
        {
          msg: "No user found with this id.",
          err: "User not found.",
        },
        { status: 404 }
      );
    }

    if (!user.isVerified) {
      return Response.json(
        {
          msg: "User is not verified",
          err: "Your account is not verified. Please verify your account first.",
        },
        { status: 500 }
      );
    } else {
      user.fullname = fullname;
      user.bio = bio;
      user.profileImg = profileImg;

      await user.save();
      return Response.json(
        {
          msg: "User info updated successfully.",
          user: user,
        },
        { status: 201 }
      );
    }
  } catch (err) {
    console.error("Error updating user info =>", err);
    return Response.json(
      {
        msg: "Failed to process your request.",
        err: "Oops, something went wrong",
      },
      { status: 500 }
    );
  }
}
