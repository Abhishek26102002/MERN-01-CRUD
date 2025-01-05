import mongoose from "mongoose"

export const connectDB=async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongo DB connect : ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error ${error}`);        
        process.exit(1); // process code 1 means failure and 0 means success
    }
} 