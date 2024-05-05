import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/ordersModel";
import { NextResponse } from "next/server";

export async function GET()
{


    await connectMongoDB();

    const res = await Order.find();

    return NextResponse.json(res);
}