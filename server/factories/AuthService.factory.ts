import { AuthService } from "../services/auth.service.ts";

export class AuthServiceFactory{
    public static create():AuthService{
        return new AuthService();
    }
}