import { User } from "../models/user.model.ts";
import type { userTypes } from "../types/types.ts";

interface AuthRepositoryTypes{
    findOneUser:(data:any)=>any
    createUser:(dataUser:userTypes)=>any
}
export class AuthRepository implements AuthRepositoryTypes{
    findOneUser(data: any){
         return User.findOne(data).select("-__v");
    } 
    createUser(dataUser: userTypes){
        return User.create({ "full_name": dataUser.full_name, "username": dataUser.username, "password": dataUser.password, "email": dataUser.email, "role": dataUser.role, "avatar": dataUser.avatar })
    }
} 