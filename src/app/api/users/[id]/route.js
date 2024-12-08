import { connectDB } from "@/lib/db/connectDB";
import { userModel } from "@/lib/models/user";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const user = await userModel.findOne({ _id: params.id });

    if (!user) {
      return Response.json(
        {
          msg: "Single user not found",
          err: "User not found",
        },
        { status: 404 }
      );
    }
    return Response.json(
      {
        msg: "Single user fetched successfully",
        user: user,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        msg: "Failed to fetch single user",
        err: err.message,
      },
      { status: 500 }
    );
  }
}
