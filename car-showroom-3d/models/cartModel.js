import mongoose, { Schema, models } from "mongoose";


const cartSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    items: [{
        cars: {
            title: String,
            description: String,
            image: String,
        },
        quantity: Number,
        price: Number
    }],

    totalPrice: Number,

    status: {
        type: String,
        enum: ['active', 'abandoned', 'completed']
    },
});

const Cart = models.Cart || mongoose.model("Cart" , cartSchema);
export default Cart;