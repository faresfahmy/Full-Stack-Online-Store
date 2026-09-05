import { Router } from "express";
import { chatsController, getMessageChat } from "../controllers/ai.controller.ts";
import { protect } from "../middleware/protect.middleware.ts";


export const routesChat = Router();
routesChat.route("/").post(protect,chatsController)

//Get all Messages
routesChat.route("/").get(getMessageChat)

