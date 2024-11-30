import { connectDB } from "@/lib/db/connectDB";
import { commentModel } from "@/lib/models/comment";
import { userModel } from "@/lib/models/user";

export async function GET(request) {
  try {
    await connectDB();
    const eventId = request?.nextUrl?.searchParams?.get("event");

    if (!eventId) {
      return Response.json({ msg: "Event ID is required" }, { status: 400 });
    }

    const comments = await commentModel
      .findOne({ event: eventId })
      .populate("comments.userId", "fullname profileImg");

    if (!comments) {
      return Response.json(
        { msg: "No comments found for this event" },
        { status: 404 }
      );
    }

    return Response.json(
      {
        msg: "Comments Fetched Successfully",
        comments: comments,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { msg: "Error fetching comments", err: err.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const { event, userId, comment } = await request.json();

    if (!event || !userId || !comment) {
      return Response.json(
        { msg: "Missing required fields: event, userId, or comment" },
        { status: 400 }
      );
    }

    // Check if the event already has comments in the database
    let commentDoc = await commentModel.findOne({ event });

    // If no document found for the event, create a new one
    if (!commentDoc) {
      commentDoc = new commentModel({
        event: event,
        comments: [{ userId, comment }],
      });
      await commentDoc.save();
    } else {
      // If a document exists, just push the new comment into the comments array
      commentDoc.comments.push({ userId, comment });
      await commentDoc.save();
    }

    return Response.json(
      {
        msg: "Comment Added Successfully",
        comment: commentDoc,
      },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      {
        msg: "Error in adding comment",
        err: err.message,
      },
      { status: 500 }
    );
  }
}
