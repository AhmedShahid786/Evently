import { connectDB } from "@/lib/db/connectDB";
import { categoryModel } from "@/lib/models/category";

export async function GET(request) {
    await connectDB()
    const categories = await categoryModel.find()
    return Response.json({
        msg : "Categories Fetched Successfully",
        categories : categories
    }, {status : 200})
}

export async function POST(request) {
    await connectDB()
    const categoryObj = await request.json()
    const newCategory = new categoryModel(categoryObj)
    await newCategory.save()

    return Response.json({
        msg : "Category Added Successfully",
        category : newCategory
    }, {status : 201})
}