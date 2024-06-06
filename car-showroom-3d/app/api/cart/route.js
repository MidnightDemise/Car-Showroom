import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/cartModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req)
{   
    const session = await getServerSession();

    const email = session.user.email;




    connectMongoDB();


    const getUserCart = await Cart.findOne({email});
    
    if(getUserCart == null)
        {
            await Cart.create({email});
        }

    


    return NextResponse.json(getUserCart);



}



