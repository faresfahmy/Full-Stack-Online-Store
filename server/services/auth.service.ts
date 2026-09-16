import { matchedData, validationResult } from "express-validator";
import { validateQuery } from "../mock/validateQuery.ts";
import { User } from "../models/user.model.ts";
import type { FILE_CLOUDINARY, ILoginInput, queryTypes, USERS, userTypes, userUpdate } from "../types/types.ts";
import { compare, hash } from "bcrypt";
import { generateToken } from "../utils/generateToken.ts";
import { ERROR, FAIL } from "../utils/httpStatus.ts";
import { appError } from "../utils/appError.ts";
import { updateFile, uploadFile } from "../lib/uploadFiles.ts";


export abstract class BaseAuthService<T> {
    abstract loginService(data: ILoginInput): Promise<{ token: string, user: USERS }>
    abstract registerService(data: T, file: Express.Multer.File | undefined): Promise<{ user: T, token: string }>
}


export class AuthService extends BaseAuthService<userTypes | USERS[] | USERS> {
    async loginService(data: ILoginInput): Promise<{ token: string; user: USERS }> {
        const { email, password, role } = data;
        const userObj = await User.findOne({ email }).select("-__v ");
        if (!userObj) {
            throw appError(FAIL, "Invalid email or password", 401);
        }
        if (role && userObj.role !== role) {
            throw appError(FAIL, "Access denied for this role", 403);
        }
        const isMatchPassword = await compare(password, userObj.password);
        if (!isMatchPassword) {
            throw appError(FAIL, "Invalid email or password", 401);
        }
        const token = await generateToken({ userId: userObj.id, role: userObj.role });

        const user = userObj.toObject();

        return { token, user };
    }


    async registerService(data: userTypes, file: Express.Multer.File | undefined): Promise<{ user: USERS | USERS[] | userTypes; token: string; }> {
        const { full_name, username, password, email, role } = data;

        const userObj = await User.findOne({ "email": email }).lean();
        if (userObj) {
            throw appError(FAIL, { user: "this is email not validate" }, 400);
        }
        let uploadAvatar;
        if (file) {
            uploadAvatar = await uploadFile(file?.path, 'users_avatars')
        }

        const passwordHashing = await hash(password, 10);
        const user = await User.create({ "full_name": full_name, "username": username, "password": passwordHashing, "email": email, "role": role, "avatar": uploadAvatar })
        const token = await generateToken({ userId: user._id.id.toString(), role: user.role });
        return {
            user: {
                id: user.id,
                full_name: user.password,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user?.avatar,
            },
            token
        }

    }

}

