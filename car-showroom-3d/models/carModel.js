import mongoose, { Schema, models } from "mongoose";


const carSchema = new Schema( {
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    price : {
        type: String , 
        required: false,
    },

    image : {
        type: String, 
        required: true,
    },



    
    car_properties: {
        type: String,
        required: false,
    }
    
})


const Car = models.Car || mongoose.model("Car",carSchema);

export default Car;