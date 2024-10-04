import express from "express";
import authController from "../controllers/auth.controller.js";
import attendanceController from "../controllers/attendance.controller.js";

const router = express.Router();

router
  .route("/")
  .get(attendanceController.getAllAttendance)
  .post(authController.protect, attendanceController.createAttendance);

router
  .route("/:id")
  .get(attendanceController.getAttendance)
  .patch(authController.protect, attendanceController.updateAttendance)
  .delete(
    authController.protect,
    authController.restrictTo("lecturer"),
    attendanceController.deleteAttendance
  );

export { router as attendanceRouter };
