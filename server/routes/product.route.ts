import { Router } from "express";
import { productValidator } from "../middleware/validateSchemaProduct.middleware.ts";
import { addProduct, deleteProduct, getAllProduct, getProduct, searchProduct, updateProduct } from "../controllers/products.controller.ts";
import { protect } from "../middleware/protect.middleware.ts";
import { allowedTo } from "../middleware/allowedTo.middleware.ts";
import multer from "multer";
import { upload } from "../middleware/upload.middleware.ts";


export const routesProducts = Router()


// Get All Products
routesProducts.route("/").get(getAllProduct)


// Search Product
routesProducts.route("/search").get(searchProduct)


// Get Product
routesProducts.route("/:id").get(getProduct)

//Add New Product
routesProducts.route("/").post(upload.array("img_product",4),protect,allowedTo,productValidator(),addProduct)

// Update Product
routesProducts.route("/:id").patch(protect,allowedTo,updateProduct)

//Like or unlike
// routesProducts.route("/like/:id").patch()

// Delete Product
routesProducts.route("/:id").delete(deleteProduct)