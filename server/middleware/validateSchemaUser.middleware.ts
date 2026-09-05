import { body } from "express-validator";

export const loginValidator = () => {
    return [
        body("email")
            .isEmail().withMessage("this is email not validat")
            .notEmpty().withMessage("email cannot be empty"),
        body("password")
            .notEmpty().withMessage("password cannot be empty"),
        body("role")
            .notEmpty().withMessage("role cannot be empty")
    ]
}
export const registerValidator = ()=>{
    return [
        body("full_name")
            .notEmpty().withMessage("full name cannot be empty"),
        body("username")
            .notEmpty().withMessage("username cannot be empty"),
        body("role")
            .notEmpty().withMessage("role cannot be empty"),
        body("email")
            .notEmpty().withMessage("email cannot be empty"),
        body("password")
            .notEmpty().withMessage("password cannot be empty"),
        body("avatar")
            .optional(),
        body("products_purchased")
            .optional()
    ]
}
