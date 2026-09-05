
import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config({ override: true });
export const connectDB = async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI!, {
            maxPoolSize:10,
            minPoolSize:2,
            waitQueueTimeoutMS:5000,
            connectTimeoutMS:20000,
            socketTimeoutMS:45000,
            maxIdleTimeMS:30000
        })
        console.log('MongoDB Connected successfully');
    }catch(err:any){
        console.error('Database connection error:', err.message);
        process.exit(1);
    }
}