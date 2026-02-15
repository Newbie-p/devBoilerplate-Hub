import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/mongo.config.js";
import frameworkRoutes from "./routes/framework.routes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.json({message : "Dev Boilerplate Hub API is running"});
})

app.use("/api/frameworks", frameworkRoutes);

app.listen(process.env.PORT, ()=>{
    connectDB();
    console.log(`server is running on port ${process.env.PORT}`);
})