import mongoose, { mongo } from "mongoose";


export const connectMongoDB = async () => {
    try {
        console.log("here");
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("successfully connected to db");
    } catch (error) {
        console.log("Error connecting to db");
    }
} 