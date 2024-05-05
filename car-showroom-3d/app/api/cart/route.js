import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/cartModel";
import { NextResponse } from "next/server";

export async function POST(req)
{   
    const {email}  = await req.json();


    connectMongoDB();

    const getUserCart = await Cart.findOne({email});


    return NextResponse.json(getUserCart);



}


