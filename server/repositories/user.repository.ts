import { User } from "../models/user.model.ts";
interface UserRepositoryTypes{
    getAllUserRepo:(limit:number, page:number)=> any;
    getCountUsers:()=>any;
    getUserById:(idUser:string)=>any
    findByIdAndUpdate:(idUser:string, data:any)=>any
}

export class UserRepository implements UserRepositoryTypes{
    getAllUserRepo(limit: number, page: number){
        return User.find().select("-password -__v").limit(limit).skip((page - 1) * limit);
    };
    getCountUsers(){
        return User.countDocuments();
    }
    async getUserById(idUser:string){
        return await User.findById(idUser).select("-password -__v");
    }
    async findByIdAndUpdate(idUser:string, data:any){
        return  await User.findByIdAndUpdate(idUser, { 
            full_name:data.full_name,
            username:data.username,
            ...(data.file_Update&&{ avatar: data.file_Update})
            }, { returnDocument: "after", runValidators: true, }).select("-password -__v");
    }
}
            