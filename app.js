import express from "express";
import dotenv from "dotenv";
import { userRouter } from "./src/routes/user.route.js";
import { courseRouter } from "./src/routes/course.route.js";
import { connectDatabase } from "./src/utils/connect.js";
import globalErrorHandler from "./src/controllers/error.controller.js";

const app = express();

dotenv.config({ path: "config.env" });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/course", courseRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 8080;
app.listen(port, async () => {
  await connectDatabase();
  console.log(`Database is connected and App is running on Port ${port}`);
});
