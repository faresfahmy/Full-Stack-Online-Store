
import dotenv from "dotenv"
import express, { type NextFunction, type Express, type Request, type Response } from 'express';


dotenv.config()
const port = process.env.PORT || 4000
export const app: Express = express()



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})