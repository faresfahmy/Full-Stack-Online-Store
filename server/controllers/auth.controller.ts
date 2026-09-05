import express, { type NextFunction, type Express, type Request, type Response } from 'express';
import { asyncWrapper } from "../middleware/asyncWrapper.middleware.ts";
import type { _Id, ILoginInput, queryTypes, userTypes, userUpdate } from "../types/types.ts";
import { appError } from "../utils/appError.ts";
import { ERROR, FAIL, SUCCESS } from "../utils/httpStatus.ts";
import { settingsCookies } from '../utils/settingsCookies.ts';
import { matchedData, validationResult } from 'express-validator';
import { userRole } from '../utils/RolesUser.ts';
import { AuthServiceFactory } from '../factories/AuthService.factory.ts';
import { User } from '../models/user.model.ts';

export const register = asyncWrapper(
    async (req: Request<{}, {}, userTypes>, res: Response, next: NextFunction) => {
        const result  = validationResult(req);
        if(!result.isEmpty()){
            return next(appError(FAIL, result.array(), 400))
        }
        const user = await AuthServiceFactory.create().registerService(matchedData(req), req.file)
        res.cookie('token', user.token, settingsCookies);
        res.status(201).json({
            status: SUCCESS,
            data: user.user,
        })
    }
)

export const login = asyncWrapper(
    async(req:Request<{},{},ILoginInput>, res:Response, next:NextFunction)=>{
        const result = validationResult(req);
        if(!result.isEmpty()){
            return next(appError(FAIL, result.array(), 400));
        }
        const resultDetails = await AuthServiceFactory.create().loginService(matchedData(req));
        res.cookie("token", resultDetails.token, settingsCookies);
        res.status(200).json({
            status:SUCCESS,
            data:{
                full_name:resultDetails.user.full_name,
                username:resultDetails.user.username, 
                email:resultDetails.user.email,
                avatar:resultDetails.user?.avatar,
                role:resultDetails.user.role 
            }
        })
    }
) 

export const logout = asyncWrapper(
    async(req:Request, res:Response, next:NextFunction)=>{
        res.clearCookie("token", settingsCookies);
        res.status(204).send();
    }
)