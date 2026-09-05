import type { NextFunction, Request, Response } from "express";
import { asyncWrapper } from "../middleware/asyncWrapper.middleware.ts";
import { decode, type JwtPayload } from "jsonwebtoken";
import { chatsService, getMessageChatService } from "../services/ai.service.ts";
import { SUCCESS } from "../utils/httpStatus.ts";
import type{ _Id } from "../types/types.ts";
import { ChatServiceFactory } from "../factories/ChatServer.factory.ts";
export const  chatsController = asyncWrapper(
    async(req:Request,res:Response, next:NextFunction)=>{
        const {text} = req.body;
        const decodeCookies = await decode(req.cookies.token);
        const MessageResponseAI = await ChatServiceFactory.create().sendPromptToChat(text,(decodeCookies as JwtPayload).userId, (decodeCookies as JwtPayload).role); 
        res.status(200).json({
            status:SUCCESS,
            data:MessageResponseAI,
    })
    }
)
export const getMessageChat = asyncWrapper(
    async(req:Request, res:Response, next:NextFunction)=>{
        const decodeCookies = await decode(req.cookies.token)
        const messagesChat = await ChatServiceFactory.create().getMessagesChat((decodeCookies as JwtPayload).userId);
        res.status(200).json(
            {
                status:SUCCESS,
                data:messagesChat
            });
    }
)
// export const deleteMessageChat = asyncWrapper(
//     async(req:Request<{idMessage:string}>, res:Response, next:NextFunction)=>{
//         const {idMessage} = req.params;
//         const decodeCookies = await decode(req.cookies.token);
//         const deleteMessage = await deleteMessageChatService(idMessage,(decodeCookies as JwtPayload).userId)
//         res.status(204).json({
//             status:SUCCESS,
//             data:"The message has been deleted."
//         });
//     }
// )