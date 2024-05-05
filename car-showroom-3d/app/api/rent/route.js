import { connectMongoDB } from "@/lib/mongodb";
import Car from "@/models/carModel";
import Rent from "@/models/rentModel";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(req)
{

    const {id , startDate , endDate , email } = await req.json();
    const session = await getServerSession();

    console.log(id , startDate , endDate, email);

    await connectMongoDB();


    const car = await Car.findById(id);
    const carTitle = car.title;



    await Rent.findOneAndUpdate(
        { email: session.user.email }, // Query by email field
        { 
            $set: { 
                car: 
                    {
                        carName: carTitle,
                        startDate,
                        endDate,
                        price: 0 // default price to 0 if undefined
                    },
                   
                }
            } 
    )

    return NextResponse.json({ message: "sucessfully done rented" }, {status: 201})

}


export async function GET(){



    const session = await getServerSession();
    const email = session?.user?.email;
    await connectMongoDB(); 


    const res = await Rent.findOne({email});

    console.log(res);
    return NextResponse.json(res);



}