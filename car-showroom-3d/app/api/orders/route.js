import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/ordersModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Parse the request body
        const caritems = await req.json();  // Directly destructuring items from the parsed body

        const email = session.user.email;

        await connectMongoDB();

       const carsData = {
            quantity: caritems[0].quantity,
            price: caritems[0].price,
            name: caritems[0].cars.title,
            image: caritems[0].cars.image,

       }
           
        


        const res = await Order.create({ email, car: carsData, orderDate: new Date().toISOString() });

        console.log(res);
        return NextResponse.json({ message: "Successfully placed order" }, { status: 201 });
    } catch (error) {
        console.error("Error placing order:", error);
        return NextResponse.json({ error: "Failed to place order" }, { status: 500 });
    }
}

export async function GET() {
    try {
        const session = await getServerSession();
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const email = session.user.email;
        await connectMongoDB();

        const res = await Order.findOne({ email });
        return NextResponse.json(res);
    } catch (error) {
        console.error("Error fetching orders:", error);
        return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
}
