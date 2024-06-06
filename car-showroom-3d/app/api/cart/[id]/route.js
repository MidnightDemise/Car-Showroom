import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/cartModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function DELETE(req)
{
    const email = (await getServerSession()).user.email;
    const {id: _id} = await req.json();
    
   
    await connectMongoDB();

    await Cart.updateOne(
        { email },
        { $pull: { items: { _id } } }
    );


    return NextResponse.json({message: "Successfully deleted the car"} , {status : 201});
}
