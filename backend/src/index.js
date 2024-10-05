import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectdb from "./db/db.js";
import userRouter from "../src/router/user.router.js";
import companyRouter from "./router/company.router.js";
import jobRouter from "./router/job.router.js";
import applicationRouter from "./router/application.router.js";
import path from "path";

dotenv.config({});

const app = express();

app.use(
  cors({
    origin: "https://job-portal-68n1.onrender.com",
    credentials: true,
  })
);

const _dirname = path.resolve();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
});

connectdb();
app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running at port ${process.env.PORT}`);
});
