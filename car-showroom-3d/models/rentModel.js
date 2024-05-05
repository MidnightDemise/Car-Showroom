import mongoose, { Schema, models } from "mongoose";


const rentSchema = new Schema({

    email:{
        type: String,
        required: true,
    },

    car: [{
            carName: {
                type: String,
                required: true,
            },
        
            startDate: {
                type: String,
                required: true,
            },
            endDate: {
                type: String,
                required: true,
            },
        
            price: {
                type: String,
            },
        }],

    



})


const Rent = models.Rent || mongoose.model("Rent",rentSchema);

export default Rent;