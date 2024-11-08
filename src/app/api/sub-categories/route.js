import { connectDB } from "@/lib/db/connectDB";
import { subCategoryModel } from "@/lib/models/subCategory";
import { categoryModel } from "@/lib/models/category";

export async function GET(request) {
  await connectDB();
  const reqUrl = request.url
  const { searchParams } = new URL(reqUrl)
  const query = {}
  if(searchParams.get("category")){
    query.category = searchParams.get("category");
  }
  const subCategories = await subCategoryModel.find(query).populate("category", "title");

  return Response.json(
    {
      msg: "SubCategories Fetched Successfully",
      subCategories: subCategories,
    },
    { status: 200 }
  );
}

export async function POST(request) {
    await connectDB()
    const subCategoryObj = await request.json()
    const newSubCategory = new subCategoryModel(subCategoryObj);
    await newSubCategory.save();

    return Response.json(
      {
        msg: "SubCategory Added Successfully",
        subCategory: newSubCategory,
      },{status: 201});
}
