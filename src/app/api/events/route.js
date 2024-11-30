import { connectDB } from "@/lib/db/connectDB";
import { categoryModel } from "@/lib/models/category";
import { eventModel } from "@/lib/models/event";
import { subCategoryModel } from "@/lib/models/subCategory";
import { userModel } from "@/lib/models/user";

export async function GET(request) {
  try {
    await connectDB();
    const category = request?.nextUrl?.searchParams?.get("category");
    const query = {};
    if (category) {
      query.category = category;
    }

    const events = await eventModel
      .find(query)
      .populate("category", "title")
      .populate("subCategory", "title")
      .populate("createdBy", "fullname email profileImg");

    return Response.json(
      {
        msg: "Events Fetched Successfully",
        events: events,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        msg: "Failed To Fetch Events",
        err: err.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const eventObj = await request.json();
    const newEvent = new eventModel(eventObj);
    await newEvent.save();

    const user = await userModel.findOne({ _id: eventObj.createdBy });
    if (!user)
      return Response.json(
        {
          msg: "Failed To Add Event",
          err: "User not found",
        },
        { status: 403 }
      );

    return Response.json(
      {
        msg: "Event Added Successfully",
        event: newEvent,
      },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({
      msg: "Failed To Add Event",
      err: err.message,
    });
  }
}
