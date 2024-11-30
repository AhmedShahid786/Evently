import { connectDB } from "@/lib/db/connectDB";
import { eventModel } from "@/lib/models/event";
import { categoryModel } from "@/lib/models/category";
import { subCategoryModel } from "@/lib/models/subCategory";
import { userModel } from "@/lib/models/user";

export async function POST(request, { params }) {
  try {
    await connectDB();

    const event = await eventModel.findOne({ _id: params.id });
    const { userId } = await request.json();
    if (!event) {
      return Response.json({ msg: "Event Not Found" }, { status: 404 });
    } else if (!userId) {
      return Response.json({ msg: "User Not Found" }, { status: 404 });
    }

    if (!event.going.includes(userId)) {
      const updatedEvent = await eventModel
        .findOneAndUpdate(
          { _id: params.id },
          { $push: { going: userId } },
          { new: true }
        )
        .exec();

      return Response.json(
        {
          msg: "Registered For Event",
          event: updatedEvent,
        },
        { status: 201 }
      );
    } else {
      const updatedEvent = await eventModel
        .findOneAndUpdate(
          { _id: params.id },
          { $pull: { going: userId } },
          { new: true }
        )
        .exec();

      return Response.json(
        {
          msg: "Removed From Event",
          event: updatedEvent,
        },
        { status: 201 }
      );
    }
  } catch (err) {
    return Response.json(
      {
        msg: "Error In Going Api Call",
        err: err.message,
      },
      { status: 500 }
    );
  }
}
