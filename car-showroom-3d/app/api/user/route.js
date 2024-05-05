import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/cartModel";
import Rent from "@/models/rentModel";
import User from "@/models/userModel";
import { NextResponse } from "next/server";

export async function POST(req)
{
    const { name , email } = await req.json();

    await connectMongoDB();

    await User.create({name , email});
    await Cart.create({email});
    await Rent.create({email});

    return NextResponse.json({message: "Successfully created the User"}, {status: 201});
}