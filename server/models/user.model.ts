import mongoose, { Schema } from "mongoose";
import { adminRole, userRole } from "../utils/RolesUser.ts";
import { validateEmail } from "../mock/validateEmail.ts";
import type { userTypes } from "../types/types.ts";

const userSchema = new Schema<userTypes>({
    full_name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    role: {
        type: String,
        enum: [userRole, adminRole], 
        default: userRole,
    },
    password: {
        type: String,
        required: true
      
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: async (email: string) => await validateEmail(email),
            message: "Email is not valid!" 
        }
    },
    products_purchased: {
        type: [String],
        required: false
    },
    wishlist: {
        type: [String],
        default: []
    },
    avatar: {
        asset_id: { type: String },
        public_id: { type: String },
        width: { type: Number },
        height: { type: Number },
        format: { type: String },
        resource_type: { type: String },
        created_at: { type: String },
        type: { type: String },
        secure_url: { type: String },
        asset_folder: { type: String }
    }
}, {
    timestamps: true 
});

export const User = mongoose.model<userTypes>("users", userSchema);