import type { NextFunction, Request, Response } from "express";
import { decode, type JwtPayload } from "jsonwebtoken";
import { appError } from "../utils/appError.ts";
import { ERROR } from "../utils/httpStatus.ts";
import { userRole } from "../utils/RolesUser.ts";

export const allowedTo = async(req:Request,res:Response, next:NextFunction)=>{
    try{
        const cookie = req.cookies.token;
        const decodeToken = await decode(cookie);
        const role = typeof decodeToken === "object" && decodeToken !== null
            ? (decodeToken as JwtPayload).role
            : undefined;
        if (role === userRole) {
            return next(appError(ERROR, null, 401, "401 Unauthorized"));
        }
        next();
    }catch(err:any){
        return next(appError(ERROR, err.message, 401, "401 Unauthorized"))
    }
}