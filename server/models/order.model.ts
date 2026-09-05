import mongoose, { Schema } from "mongoose";
import type { OrderTypes } from "../types/types.ts";

const order = new Schema<OrderTypes>({
    idProduct:{
        type:String,
        require:true
    },
    idBuyer:{
        type:String,
        require:true
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
    subtotal:"text",
    shippingFee:"text",
})
export const Order = mongoose.model<OrderTypes>("order", order);
