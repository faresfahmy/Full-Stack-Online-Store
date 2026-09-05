import { Router } from "express";
import { allowedTo } from "../middleware/allowedTo.middleware.ts";
import { protect } from "../middleware/protect.middleware.ts";
import { addThePaymentProcessController, createSessionPaymentController, getAllOrdersController } from "../controllers/order.controller.ts";




export const routeOrder = Router();
routeOrder.route("/").get(protect, getAllOrdersController)
routeOrder.route("/create-session").post(protect, createSessionPaymentController)
routeOrder.route("/success").get(protect, addThePaymentProcessController)
// routeOrder.route("/cancel").get(protect)