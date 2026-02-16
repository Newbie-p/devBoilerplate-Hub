import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import connectDB from "./config/mongo.config.js";
import frameworkRoutes from "./routes/framework.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import snippetRoutes from "./routes/snippet.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { verifyJWT, checkRole } from "./middleware/auth.middleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res)=>{
    res.json({message : "Dev Boilerplate Hub API is running"});
})

app.use("/api/frameworks", frameworkRoutes);
app.use("/api/frameworks", categoryRoutes);
app.use("/api/frameworks", snippetRoutes);
app.use("/api/auth", authRoutes);
app.get("/api/protected", verifyJWT, (req, res) => {
  res.json({ message: "You are authenticated", user: req.user });
});

app.listen(process.env.PORT, ()=>{
    connectDB();
    console.log(`server is running on port ${process.env.PORT}`);
})