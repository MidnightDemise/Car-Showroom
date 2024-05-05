import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/cartModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req)
{
        // Get the session data from the server
        const session = await getServerSession();

        // Extract the cart data from the request body
        const { cart } = await req.json();
        // Connect to MongoDB
        console.log(cart);
        await connectMongoDB();
        
        

    
        await Cart.findOneAndUpdate(
            { email: session.user.email }, // Query by email field
            { 
                $set: { 
                    items: cart.filter(item => item.title).map(item => ({
                        
                        cars: {
                            title: item.title,
                            description: item.description,
                            image: item.image
                        },
                        quantity: item.quantity || 1, // default quantity to 1 if undefined
                        price: item.price || 0 // default price to 0 if undefined
                    }))
                } 
            }
        );

    

        // Respond with success
        return NextResponse.json({message: "Successfully updated"}, {status: 201});
    


}