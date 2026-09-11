import { UserRepository } from "../../repositories/user.repository.ts";
export class UserRepoFactory{
    public static create():UserRepository{
        return new UserRepository();
    }
}