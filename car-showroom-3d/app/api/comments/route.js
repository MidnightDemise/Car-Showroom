import { connectMongoDB } from "@/lib/mongodb";
import Comment from "@/models/commentModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req)
{
    const {commentDescription} = await req.json();
    const session = await getServerSession();
    await connectMongoDB();

    const email = session.user.email;

    await Comment.create({ user: email , commentDescription})


    return NextResponse.json({message: "Successfully done comment creation"} , {status: 201})


}


export async function GET()
{
    const session = await getServerSession();

    const email = session?.user?.email;
    await connectMongoDB();


    const res = await Comment.find();

    return NextResponse.json(res);


}