import mongoose from "mongoose"

//Interface User
export interface userTypes{
    id?:string,
    full_name:string,
    username:string,
    password:string, 
    email:string, 
    avatar?:FILE_CLOUDINARY|undefined,
    products_purchased?:string[],
    role:string
}
export interface USERS{
    id?:string,
    full_name:string,
    username:string,
    email:string, 
    avatar?:FILE_CLOUDINARY|undefined,
    products_purchased?:string[],
    role:string
}
export interface FILE_CLOUDINARY{
    asset_id:string
    public_id: string,
    width:number,
    height:number,
    format:string,
    resource_type:string,
    created_at:string,
    type:string,
    secure_url:string,
    asset_folder:String
}


//Interface Product
export interface productTypes{
    product_name:string,
    description:string,
    rating?:number,
    quantity:number,
    category:string,
    price:string,
    sku:string,
    likes_product?:string[],
    img_product?:FILE_CLOUDINARY[],
    ids_users_purchased?:string[]
    publishImmediately:boolean,
    couponCode?:number,
    _id?: string,
    id?:string
    __v?: number,
}


export interface bodyTypes{
    status?:string
    statusCode:number,
    data:any, 
    message:string, 
}

export interface queryTypes{
    limit?:string,
    page?:string,
    q?:string,
    category?:string,
}
export interface ILoginInput {
  email: string;
  password: string;
  role?: string;
}

export interface userUpdate{
    id:string
    full_name:string,
    username:string, 
    avatar?:FILE_CLOUDINARY|undefined,
}
export interface Chats{
  userId: string;
  messages: Array<{
    role: 'user' | 'model';
    parts: Array<{text: string }>;
  }>;
  updatedAt:string
}
//Multipe Filles
export type  Files_Upload =Express.Multer.File[] | {[fieldname: string]: Express.Multer.File[]} | undefined;

export interface OrderTypes{
    idProduct:string,
    idBuyer:string,
    totalAmount:number,
    subtotal:number|null,
    shippingFee:number,
    discountAmount:number,
    quantity?:number,
    productName:string
    sessionId: string,
    customerEmail?: string|null,
    paymentStatus?: string, 
     _v?:string,
    id?:string
}


export interface ADD_ORDER{
    idProduct: string,
    idUser: string, 
    idShipping: string, 
    coupon?: number
    session_id?:string
}


export interface RESPONSE_CHAT{
        userId: string|undefined,
        modelId: mongoose.Types.ObjectId | undefined,
        responseModel: string,
        userPrompt: string
}

export const categoriesProduct:string[] = [
    "Electronics",
    "Apparel & Fashion",
    "Home & Kitchen",
    "Accessories & Gear",
    "Accessories"   
]


//Params Is
export interface _Id{
    id:string
}