import { Router } from "express";
import { protect } from "../middleware/protect.middleware.ts";
import { allowedTo } from "../middleware/allowedTo.middleware.ts";
import { addOrDeleteProdInWishlist, getAllUsers, getCurrentUser, getUser, updateUser } from "../controllers/user.controller.ts";
import { upload } from "../middleware/upload.middleware.ts";




export const routesUser = Router();


// Get All Users
routesUser.route("/").get(protect,allowedTo,getAllUsers);

// Patch User
routesUser.route("/").patch(upload.single("avatar"),protect, updateUser);


//Get Current User
routesUser.route("/current").get(protect, getCurrentUser);


//Get user
routesUser.route("/:id").get(protect, getUser);




//add product on wishlist
routesUser.route("/wishlist/:id").patch(protect, addOrDeleteProdInWishlist);