import { connectDB } from "@/lib/db/connectDB";
import { categoryModel } from "@/lib/models/category";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const category = await categoryModel.findOne({ _id: params.id });

    return Response.json(
      {
        msg: "Single category fetched successfully",
        category: category,
      },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      {
        msg: "Failed to fetch single category",
        err: err.message,
      },
      { status: 500 }
    );
  }
}
