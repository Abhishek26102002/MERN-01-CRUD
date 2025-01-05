import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js"
import cors from "cors"; 

const app = express();

dotenv.config();

app.use(express.json()); // middle ware to help accept json as req body
app.use(cors());

app.use("/api/products",productRoutes)

// console.log(process.env.MONGO_URI);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Listening at http://localhost:${PORT}`);
});
