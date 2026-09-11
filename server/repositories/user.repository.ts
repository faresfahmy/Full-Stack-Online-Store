import { User } from "../models/user.model.ts";
interface UserRepositoryTypes{
    getAllUserRepo:(limit:number, page:number)=> any;
    getCountUsers:()=>any;
    getUserById:(idUser:string)=>any
    findByIdAndUpdateUser:(idUser:string, data:any)=>any
    findOneUser:(data:any)=>any
    updateProductsPurchasedUser:(idUser:string, operatorUpdate:any)=> any
}

export class UserRepository implements UserRepositoryTypes{
    getAllUserRepo(limit: number, page: number){
        return User.find().select("-password -__v").limit(limit).skip((page - 1) * limit);
    };
    getCountUsers(){
        return User.countDocuments();
    }
    getUserById(idUser:string){
        return  User.findById(idUser).select("-password -__v");
    }
    findByIdAndUpdateUser(idUser:string, data:any){
        return  User.findByIdAndUpdate(idUser, { 
            full_name:data.full_name,
            username:data.username,
            ...(data.file_Update&&{ avatar: data.file_Update})
            }, { returnDocument: "after", runValidators: true, }).select("-password -__v");
    }
    findOneUser(data:any){
        return User.findOne(data).select("-__v");
    }
    updateProductsPurchasedUser(idUser:string, operatorUpdate:any){
        return User.findByIdAndUpdate(idUser, operatorUpdate);
    }
}