import type { NextFunction } from "express"
import { appError } from "../utils/appError.ts"
import { ERROR } from "../utils/httpStatus.ts"


export const asyncWrapper = (asyncFn:any)=>{
    return (req:Express.Request, res:Express.Response, next:NextFunction)=>{
        asyncFn(req, res, next).catch((err:unknown)=>{
            next(err);
        })
    }
}

