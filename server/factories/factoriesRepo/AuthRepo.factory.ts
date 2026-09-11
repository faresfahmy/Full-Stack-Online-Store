import { AuthRepository } from "../../repositories/auth.repository.ts";


export class AuthRepoFactory{
    public static create():AuthRepository{
        return new AuthRepository();
    }
}