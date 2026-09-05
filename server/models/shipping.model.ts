import mongoose, { Schema } from "mongoose";

const shipping = new Schema({
    nameShipping:{
        type:String,
        unique:true,
        required:true
    },
    shippingFee:{
        type:Number,
        required:true
    }
});
export const Shipping = mongoose.model("shipping", shipping);