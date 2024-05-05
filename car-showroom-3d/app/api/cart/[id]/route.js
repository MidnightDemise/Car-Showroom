import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/cartModel";
import { NextResponse } from "next/server";

export async function DELETE(req)
{
    const {_id} = await req.json();
    
    console.log(_id);
    await connectMongoDB();

    await Cart.findOneAndDelete(_id);

    return NextResponse.json({message: "Successfully deleted the car"} , {status : 201});
}
