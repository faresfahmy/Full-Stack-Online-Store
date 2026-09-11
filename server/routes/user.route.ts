import { Router } from "express";
import { protect } from "../middleware/protect.middleware.ts";
import { allowedTo } from "../middleware/allowedTo.middleware.ts";
import { addOrDeleteProdInWishlist, getAllUsers, getCurrentUser, getUser, update } from "../controllers/user.controller.ts";
import { upload } from "../middleware/upload.middleware.ts";




export const routesUser = Router();


// Get All Users
routesUser.route("/").get(protect,allowedTo,getAllUsers);

// Patch User
routesUser.route("/:id").patch(upload.single("avatar"),protect, update);

//Get user
routesUser.route("/:id").get(protect,getUser);

//Get Current User
routesUser.route("/current").post(protect,getCurrentUser);


//add product on wishlist
routesUser.route("/wishlist/:id").patch(protect, addOrDeleteProdInWishlist);