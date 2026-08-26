export interface userTypes {
    id:string,
    full_name: string,
    username: string,
    password: string,
    email: string,
    avatar?: FILE_CLOUDINARY | undefined,
    products_purchased?: string[],
    role: string
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