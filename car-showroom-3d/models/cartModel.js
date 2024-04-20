import mongoose, { Schema, models } from "mongoose";


const cartSchema = new Schema({

    email : {
        type: String ,
        
    },

    carID : {
        type: String,
    }
})

const Cart = models.Cart || mongoose.model("Cart" , cartSchema);
export default Cart;