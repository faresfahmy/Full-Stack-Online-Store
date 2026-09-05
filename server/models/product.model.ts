import mongoose, { Schema } from "mongoose";
import { categoriesProduct, type productTypes } from "../types/types.ts";

const product = new Schema<productTypes>({
    product_name: {
        type: String,
        required: true,
        unique: true
    },
    sku: {
        type: String,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        enum: categoriesProduct,
        default: "Electronics",
    },
    likes_product: {
        type: [String],
    },
    img_product: [{
        asset_id: {
            type: String
        },
        public_id: {
            type: String
        },
        width: {
            type: Number
        },
        height: {
            type: Number
        },
        format: {
            type: String
        },
        resource_type: {
            type: String
        },
        created_at: {
            type: String
        },
        type: {
            type: String
        },
        secure_url: {
            type: String
        },
        asset_folder: {
            type: String
        }
    }],
    ids_users_purchased: {
        type: [String]
    },
    publishImmediately: {
        type: Boolean,
        default: false
    },
    couponCode:{
        type:String,
        require:false
    }
})

product.index({
    product_name: "text",
    description: "text",
    category: "text",
    price: "text",
})
export const Product = mongoose.model<productTypes>("products", product)