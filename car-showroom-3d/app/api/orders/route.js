import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/ordersModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    const session = await getServerSession();

    const { cars } = await req.json();
    const email = session?.user?.email;

    await connectMongoDB();

    const carsData = [];

    const date = new Date();

    
    for (const item of cars.items) {
        const { quantity, price } = item;
        
        
        const carData = {


            quantity,
            price,
            name: item.cars.title,
            image: item.cars.image,



        };


        carsData.push(carData);
    }


    await Order.create({ email, car: carsData  , orderDate: date.toString()});

    return NextResponse.json({ message: "Successfully placed order" }, { status: 201 });
}




export async function GET()
{

    const session = await getServerSession();

    const email = session.user.email;

    await connectMongoDB();

    const res = await Order.findOne({email})



    return NextResponse.json(res);
}