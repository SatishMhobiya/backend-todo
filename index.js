import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./data/database.js";
import userRouter from "./routes/user.js";

config({
    path: "./data/config.env"
})

export const app = express();

//connecting to database
connectDB();

//using middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

//using routes
app.use("/users", userRouter)


