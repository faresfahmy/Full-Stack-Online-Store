import mongoose, { Schema } from "mongoose";
import type { OrderTypes } from "../types/types.ts";

const order = new Schema<OrderTypes>({
    idProduct:{
        type:String,
        require:true,
        ref:"products"
    },
    idBuyer:{
        type:String,
        require:true,
        ref:"users"
    },

    totalAmount:{
        type:Number,
        require:true
    },
    subtotal:{
        type:Number,
        require:true,
    },
    sessionId: { type: String, required: true },
    customerEmail: String,
    paymentStatus: String, 
})
order.index({
    totalAmount:"text",
})
export const Order = mongoose.model<OrderTypes>("order", order);
