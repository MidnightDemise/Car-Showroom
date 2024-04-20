import { connectMongoDB } from "@/lib/mongodb";
import Car from "@/models/carModel";
import { NextResponse } from "next/server";

export async function GET(params)
{

    await connectMongoDB();

    const result = await Car.findOne(params.id);

    return NextResponse.json(result);
}


export async function PUT(request , params){

       


    const { id: _id , newTitle: title , newDescription: description , newImage : image , newProperties : car_properties } =  await request.json();

    await connectMongoDB();


    await Car.findByIdAndUpdate(_id , { title , description , image , car_properties})

    return NextResponse.json({message: "Successfully updated the Car"}, {status: 201});

}


export async function DELETE(req , params)
{
    const {id : _id} = await req.json();
    
    await connectMongoDB();

    await Car.findOneAndDelete(_id);

    return NextResponse.json({message: "Successfully deleted the car"} , {status : 201});
}