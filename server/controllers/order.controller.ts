import type { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper.middleware.ts";
import type{ ADD_ORDER, queryTypes } from "../types/types.ts";
import jwt from "jsonwebtoken";
import { OrderServiceFactory } from "../factories/OrderService.factory.ts";
import { SUCCESS } from "../utils/httpStatus.ts";
export const getAllOrdersController = asyncWrapper(
    async(req:Request<{},{},{},queryTypes>, res:Response, next:NextFunction)=>{
        const query = req.query;
        const {orders, totalOrders, totalPage} = await OrderServiceFactory.create().getAllOrders(query);
        res.status(200).json({
            status:SUCCESS,
            data:{
                pages:totalPage,
                count:totalOrders,
                orders
            }
        })
    }
)

export const createSessionPaymentController = asyncWrapper(
    async (req:Request<{},{},ADD_ORDER>, res:Response, next:NextFunction)=>{
        const body = req.body;
        const {paymentLink} = await OrderServiceFactory.create().creatSession(body);
        res.status(200).json({
            status:SUCCESS,
            data:{
                paymentLink
            }
        })
}
)

export const addThePaymentProcessController =  asyncWrapper(
    async (req:Request<{},{},{},ADD_ORDER>, res:Response, next:NextFunction)=>{
        const query = req.query;
        const decode = (req as any).user;
        const addOrder = await OrderServiceFactory.create().addOrder(query);
        res.status(200).json({
            status:SUCCESS,

        })
    }
)