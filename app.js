import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { userRouter } from "./src/routes/user.route.js";
import { courseRouter } from "./src/routes/course.route.js";
import { attendanceRouter } from "./src/routes/attendance.route.js";
import { connectDatabase } from "./src/utils/connect.js";
import globalErrorHandler from "./src/controllers/error.controller.js";
import AppError from "./src/utils/appError.js";

const app = express();

app.use(cors());
app.options("*", cors());

dotenv.config({ path: "config.env" });

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

await connectDatabase();

app.use('/', (req, res) => {
  res.status(200).json({
    status: "Edutrack Hosted Successfully"
  })
})
app.use("/api/v1/users", userRouter);
app.use("/api/v1/course", courseRouter);
app.use("/api/v1/attendance", attendanceRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Database is connected and App is running on Port ${port}`);
});

export default app;
