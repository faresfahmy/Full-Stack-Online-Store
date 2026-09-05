import express, { type NextFunction, type Express, type Request, type Response } from 'express';
import { asyncWrapper } from "../middleware/asyncWrapper.middleware.ts";
import type { _Id, ILoginInput, queryTypes, userTypes, userUpdate } from "../types/types.ts";
import { appError } from "../utils/appError.ts";
import { ERROR, FAIL, SUCCESS } from "../utils/httpStatus.ts";
import { UserServiceFactory } from '../factories/UserService.factory.ts';


export const getAllUsers = asyncWrapper(
    async (req: Request<{}, {}, {}, queryTypes>, res: Response, next: NextFunction) => {
        const [users, totalUsers, totalPages] = await UserServiceFactory.create().getAllUsersService(req.query);
        return res.status(200).json({
            status: SUCCESS,
            data: {
                pages: totalPages,
                count: totalUsers,
                users,
            }
        })
    }
)

export const update = asyncWrapper(
    async (req: Request<_Id, {}, userUpdate>, res: Response, next: NextFunction) => {
        let userObj;
        const path = req.file;
        console.log(req.body);
        if (path) {
            userObj = await UserServiceFactory.create().updateUserService(req.params.id, req.body, path);
        }
        else {
            userObj = await UserServiceFactory.create().updateUserService(req.params.id, req.body)
        }

        if (!userObj) {
            return next(appError(FAIL, "This user does not exist.", 400))
        }
        res.status(200).json({
            status: SUCCESS,
            data: userObj,
        });
    }
)


export const getUser = asyncWrapper(
    async (req: Request<_Id>, res: Response, next: NextFunction) => {

        const userObj = await UserServiceFactory.create().getUserService(req.params.id)
        if (!userObj) {
            return next(appError(FAIL, "This user does not exist.", 404))
        }
        res.status(200).json({
            status: SUCCESS,
            data: userObj,
        });
    }
)

export const getCurrentUser = asyncWrapper(
    async (req: Request, res: Response, next: NextFunction) => {
        const userObg = (req as Request & { user?: any }).user;
        if (!userObg) {
            return next(appError(ERROR, null, 401, "401 Unauthorized"));
        }
        const getUserCurrentObj = await UserServiceFactory.create().getCurrentUserService(userObg);
        res.status(200).json({
            status: SUCCESS,
            data: getUserCurrentObj,
        });
    }
)
