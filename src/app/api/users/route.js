import { connectDB } from "@/lib/db/connectDB";
import { userModel } from "@/lib/models/user";

export async function GET(request) {
    await connectDB()
    const users = await userModel.find()
    return Response.json({
    msg : "Users Fetched Successfully",
    users : users
    }, {status : 200})
}

export async function POST(request) {
    await connectDB()
    const userObj = await request.json()
    let newUser = new userModel(userObj)
    await newUser.save()

    return Response.json(
      {
        msg: "User Added Successfully",
        addedUser: newUser,
      },
      { status: 201 }
    );
}

export async function PUT(request) {}

export async function DELETE(request) {}