import { connectDB } from "@/lib/db/connectDB";
import { eventModel } from "@/lib/models/event";
import { categoryModel } from "@/lib/models/category";
import { subCategoryModel } from "@/lib/models/subCategory";
import { userModel } from "@/lib/models/user";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const event = await eventModel
      .findOne({ _id: params.id })
      .populate("category", "title")
      .populate("subCategory", "title")
      .populate("createdBy", "fullname email profileImg")
      .populate("going", "_id fullname email profileImg");

    return Response.json(
      {
        msg: "Single event fetched successfully",
        event: event,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        msg: "Failed to fetch single event",
        err: err.message,
      },
      { status: 500 }
    );
  }
}
