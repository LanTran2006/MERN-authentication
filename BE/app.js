import mongoose from "mongoose";
import { config } from "dotenv";
import express from "express";
import authRouter from "./routes/user.js";
import cookieParser from "cookie-parser";
import cors from 'cors'
config();

const app = express();
mongoose
  .connect(process.env.URl)
  .then(() => {
    console.log("sucess");
  })
  .catch(() => {
    console.log("failed");
  });
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json())
app.use(cookieParser())
app.use("/auth", authRouter);
app.listen(5000, () => {
  console.log("hello world");
});
