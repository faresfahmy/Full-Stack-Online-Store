import { UserService } from "../services/user.service.ts";

export class UserServiceFactory{
    public static create():UserService{
        return new UserService();
    }
}