import { connectMongoDB } from "@/lib/mongodb";
import Rent from "@/models/rentModel";
import { NextResponse } from "next/server";

export async function GET()
{


    await connectMongoDB();

    const res = await Rent.find();

    return NextResponse.json(res);

}