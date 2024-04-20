import { connectMongoDB } from "@/lib/mongodb";
import Car from "@/models/carModel";
import { NextResponse } from "next/server";

export async function POST(req)
{
    const { title , description , image , properties } = await req.json();

    await connectMongoDB();

    await Car.create({title , description , image , car_properties : properties});

    return NextResponse.json({message: "Successfully created the Car"}, {status: 201});
}


export async function GET()
{
    await connectMongoDB();

    const result = await Car.find();

    return NextResponse.json(result);

}