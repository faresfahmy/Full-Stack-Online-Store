export interface userTypes {

    id?:string,
    full_name:string,
    username:string,
    email:string, 
    avatar?:FILE_CLOUDINARY|undefined,
    products_purchased?:string[],
    role:string,
    wishlist?:string[]
}
export interface payloadLogin {
    password: string,
    email: string,
    role: string
}

export interface respnseUser {
    data: userTypes,
    status: string,
    statusCode?:number,
    message?:string
}
export interface FILE_CLOUDINARY {
    asset_id: string
    public_id: string,
    width: number,
    height: number,
    format: string,
    resource_type: string,
    created_at: string,
    type: string,
    secure_url: string,
    asset_folder: String
}
export interface productsAll{
    count:number,
    pages:number,
    products:productTypes[]
}
export interface productTypes{
    _id:string,
    product_name:string,
    description:string,
    rating?:number,
    quantity:number,
    category:string,
    price:string,
    sku:string,
    likes_product?:string[],
    img_product?:FILE_CLOUDINARY[]|FILE_CLOUDINARY,
    ids_users_purchased?:string[]
}

export interface ResponseProducts{
    data:productsAll,
    status: string,
    statusCode?:number,
    message?:string
}
export interface Response{
    data:any,
    status:string,
    statusCode?:number,
    message?:string
}
export interface FormEdit{
    username:string,
    fullname:string,
}

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

export interface ORDER_RESPONSE{
    _id:string,
    idProduct:productTypes,
    idBuyer:userTypes,
    totalAmount: number,
    subtotal: number,
    paymentStatus: string
}