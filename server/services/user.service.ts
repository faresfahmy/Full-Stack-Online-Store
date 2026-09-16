import { matchedData, validationResult } from "express-validator";
import { validateQuery } from "../mock/validateQuery.ts";
import { User } from "../models/user.model.ts";
import type { FILE_CLOUDINARY, ILoginInput, queryTypes, USERS, userTypes, userUpdate } from "../types/types.ts";
import { compare, hash } from "bcrypt";
import { generateToken } from "../utils/generateToken.ts";
import { ERROR, FAIL } from "../utils/httpStatus.ts";
import { appError } from "../utils/appError.ts";
import { updateFile, uploadFile } from "../lib/uploadFiles.ts";
import { Product } from "../models/product.model.ts";


export abstract class BaseUserService<T> {
    abstract getAllUsersService(q: queryTypes): Promise<[T, number, number]>
    abstract updateUserService(idUser: string, data: userUpdate, file?: Express.Multer.File): Promise<T | null>
    abstract getUserService(idUser: string): Promise<T | null>
    abstract getCurrentUserService(userId: string ): Promise<USERS>
    abstract updateProductsPurchased(idProduct:string, idUser:string): Promise<void>;
    abstract addOrDeleteInWishlist(idProduct:string, idUser:string): Promise<string[]|undefined>
}


export class UserService extends BaseUserService<userTypes | USERS[] | USERS> {
    async getAllUsersService(q: queryTypes): Promise<[userTypes | USERS[], number, number]> {
        const query = q ?? {};
        const { limit, page } = validateQuery(query.limit || "20", query.page || "1");
        const [users, totalUsers] = await Promise.all([
            User.find().select("-password -__v").limit(limit).skip((page - 1) * limit).lean(),
            User.countDocuments().lean()
        ])
        const totalPages = Math.ceil(totalUsers / limit);
        return [users, totalUsers, totalPages];
    }


    async updateUserService(idUser: string, data: userUpdate, file?: Express.Multer.File): Promise<USERS | null> {
        const { full_name, username } = data;
        let userObj;
        let file_Update
        const user = await User.findById(idUser).select("-password -__v").lean();
        if (!user?.avatar && file) {
            file_Update = await uploadFile(file.path, "avatar");
            userObj = await User.findByIdAndUpdate(idUser, { full_name, username, avatar: file_Update }, { returnDocument: "after", runValidators: true, }).select("-password -__v");
            return userObj;
        }
        if (file && user?.avatar) {
            file_Update = await updateFile(file.path, user.avatar.public_id);
            userObj = await User.findByIdAndUpdate(idUser, { full_name, username, avatar: file_Update }, { returnDocument: "after", runValidators: true, }).select("-password -__v");
            return userObj
        }
        userObj = await User.findByIdAndUpdate(idUser, { full_name, username }, { returnDocument: "after", runValidators: true, }).select("-password -__v");
        return userObj
    }
    async getUserService(idUser: string): Promise<userTypes | USERS | USERS[] | null> {
        const userObj = await User.findById({ "_id": idUser }).select("-password -__v").lean();
        return userObj;
    }
    
    async getCurrentUserService(userId: string): Promise<USERS> {
        const userData = await User.findById(userId).select("-password -__v");
        if (!userData) {
            throw appError(ERROR, null, 401, "401 Unauthorized")
        }
        return {
            id: userData.id,
            full_name: userData.full_name,
            username: userData.username,
            email: userData.email,
            avatar: userData.avatar || undefined,
            products_purchased: userData.products_purchased || [],
            role: userData.role
        };
    }
    async updateProductsPurchased(idProduct:string, idUser:string):Promise<void>{
        const operatorUpdate = {
            $push:{products_purchased:idProduct}
        }
        const update = await User.findByIdAndUpdate(idUser, operatorUpdate)
    }
    async addOrDeleteInWishlist(idProduct: string, idUser: string): Promise<any> {
        const user = await User.findById(idUser).select("-password -__v").lean();
        if(!user){
            throw appError(ERROR, null, 401, "401 Unauthorized")
        }
         const product = await Product.findById(idProduct).lean();
         if(!product){
            throw appError(FAIL, "Product not found", 404);
         }
         let operatorUpdate;
         let isExistProduct = user.wishlist?.includes(idProduct);
         if(isExistProduct){
            operatorUpdate = {$pull:{wishlist:idProduct}};
         }
         else{
            operatorUpdate = {$push:{wishlist:idProduct}};
         }
         const updateWishlist= await User.findByIdAndUpdate(idUser, operatorUpdate, {new:true});
         
         return updateWishlist?.wishlist;
    }
}

