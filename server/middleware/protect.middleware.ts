import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { appError } from "../utils/appError.ts";
import { ERROR } from "../utils/httpStatus.ts";
import { decode } from "node:punycode";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.token;
        if (!token) {
            return next(appError(ERROR, null, 401, "401 Unauthorized"));
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET!!);
       
        if (!decoded) {
            return next(appError(ERROR, null, 401, "401 Unauthorized"));
        }
        (req as any).user = decoded;
        next();
    } catch (err: any) {
        return next(appError(ERROR, err.message, 401, "401 Unauthorized"));
    }
};