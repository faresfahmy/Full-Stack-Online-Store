import { body } from "express-validator"

export const productValidator = ()=>{
    return [
        body("product_name")
            .notEmpty().withMessage("product name cannot be empty"),
        body("description")
            .notEmpty().withMessage("Description cannot be empty"),
        body("img_product")
            .optional(),
        body("quantity")
            .notEmpty().withMessage("quantity cannot be empty"),
        body("price")
            .notEmpty().withMessage("price cannot be empty"),
        body("category")
            .notEmpty().withMessage("category cannot be empty"),
        body("rating")
            .optional(),
        body("likes_product")
            .optional(),
        body("ids_users_purchased")
            .optional(),
    ]
}