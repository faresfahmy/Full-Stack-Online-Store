
import dotenv from "dotenv"
import cookieParser from 'cookie-parser'
import express, { type NextFunction, type Express, type Request, type Response } from 'express';
import cors from 'cors'
import { routesUser } from './routes/user.route.ts'
import { ERROR, FAIL } from "./utils/httpStatus.ts";
import { routesProducts } from "./routes/product.route.ts";
import { routesChat } from "./routes/chat.route.ts";
import { connectDB } from "./config/database.ts";
import { routeOrder } from "./routes/order.route.ts";
import { routesAuth } from "./routes/auth.route.ts";
import { app } from "./server.ts";
// const __pathFile = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__pathFile)


dotenv.config()
app.use(express.json())

app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
     methods: ["POST", "GET", "PATCH","PUT", "DELETE"],

}))


//Connect on MONGODB
connectDB()

//Routes
app.use("/api/users", routesUser)


app.use("/api/auth", routesAuth)

app.use("/api/products",routesProducts)

app.use("/api/chat",routesChat)

app.use("/api/orders", routeOrder)


// app.use(express.static(path.join(__dirname)))

//Handle ERROR
app.use((error:any, req:Request, res:Response, next:NextFunction)=>{
    if(error.status==FAIL){
         return res.status(error.statusCode||400).json({
            status:error.status||FAIL,
            data:error.data||null,
            statusCode:error.statusCode||400,
        })
    }
    else{
           return  res.status(error.statusCode||500).json({
            status:error.status||ERROR,
            data:null,
            statusCode:error.statusCode||500,
            message:error.message||"An unexpected server error occurred"
        })
    }
})









//Handle Resource If not Found Router

//global Auth middleware for not found router
app.all('/{*auth}', (req: Request, res: Response, next: any) => {
    res.status(404).json({
        status: ERROR,
        data: null,
        message: "This resource is not available",
        code: 404
    })
})


//global Orders middleware for not found router
app.all('/{*orders}', (req: Request, res: Response, next: any) => {
    res.status(404).json({
        status: ERROR,
        data: null,
        message: "This resource is not available",
        code: 404
    })
})


//global Chat middleware for not found router
app.all('/{*chat}', (req: Request, res: Response, next: any) => {
    res.status(404).json({
        status: ERROR,
        data: null,
        message: "This resource is not available",
        code: 404
    })
})

//global Products middleware for not found router
app.all('/{*products}', (req: Request, res: Response, next: any) => {
    res.status(404).json({
        status: ERROR,
        data: null,
        message: "This resource is not available",
        code: 404
    })
})

//global Users middleware for not found router
app.all('/{*users}', (req: Request, res: Response, next: any) => {
    res.status(404).json({
        status: ERROR,
        data: null,
        message: "This resource is not available",
        code: 404
    })
})

