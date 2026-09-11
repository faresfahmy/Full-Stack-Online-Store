import mongoose, { Schema } from "mongoose";
import { adminRole, userRole } from "../utils/RolesUser.ts";
import { validateEmail } from "../mock/validateEmail.ts";
import type { userTypes } from "../types/types.ts";


const user = new Schema <userTypes>({
    full_name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true, unique:true
    },
    role:{
        type:String,
        enum:[userRole, adminRole], 
        default:userRole,
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator: async(email:string)=>await validateEmail(email),
            message:"Email is not validate !"
        }
    },
    products_purchased:{
        type:[String],
        required:false
    },
    wishlist:{
        type:[String],
        default:[]
    },
    avatar:{
    asset_id: {
        type:String
    },
    public_id: {
        type:String
    },
    width: {
        type:Number
    },
    height:{
        type:Number
    },
    format: {
        type:String
    },
    resource_type: {
        type:String
    },
    created_at:{
        type:String
    },
    type: {
        type:String
    },
    secure_url: {
        type:String
    },
    asset_folder:{
        type:String
    }
    }
})

export const User = mongoose.model<userTypes>("users", user) 