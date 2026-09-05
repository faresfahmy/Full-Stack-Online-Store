import { Router } from "express";
import { login, logout, register} from "../controllers/auth.controller.ts";
import { loginValidator, registerValidator } from "../middleware/validateSchemaUser.middleware.ts";
import { allowedTo } from "../middleware/allowedTo.middleware.ts";
import { protect } from "../middleware/protect.middleware.ts";
import { upload } from "../middleware/upload.middleware.ts";



export const routesAuth = Router();


// POST Register
routesAuth.route("/register").post(upload.single("avatar"),registerValidator(), register);

//POST Login
routesAuth.route("/login").post(loginValidator(),login);


//Logout User
routesAuth.route("/logout").post(logout)