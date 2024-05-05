import mongoose, { Schema, models } from "mongoose";

const orderSchema = new Schema({
    email: {
        type: String,
        required: true,
    },

    orderDate: {
        type: String,


    },

    car: [{
        name: {
            type: String,
        },

        image: {
            type: String,
        },

        price: {
            type: String,
        },

        quantity: {
            type: Number ,
        }
    }]


})

const Order = models.Order || mongoose.model("Order",orderSchema);

export default Order;