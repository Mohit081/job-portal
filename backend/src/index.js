import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectdb from "./db/db.js";
import userRouter from "../src/router/user.router.js";
import companyRouter from "./router/company.router.js";

dotenv.config({});

const app = express();

app.use(
  cors({
    origin: "http//localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);

connectdb();
app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running at port ${process.env.PORT}`);
});
