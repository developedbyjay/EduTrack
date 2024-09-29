import express from "express";
import { userRouter } from "./src/routes/user.route";
import { courseRouter } from "./src/routes/course.route";
import { connectDatabase } from "./src/utils/connect";
import globalErrorHandler from "./src/controllers/error.controller";

const app = express();

app.use("/api/v1/users", userRouter);
app.use("/api/v1/course", courseRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(process.env.PORT || 8080, async () => {
  await connectDatabase();
  console.log(`Database is connected and App is running on Port ${port}`);
});
