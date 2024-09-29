import express from "express";
import authController from "../controllers/auth.controller.js";
import courseController from "../controllers/course.controller.js";

const router = express.Router();

router
  .route("/get-today-course")
  .get(courseController.getTodayCourse, courseController.getAllCourse);

router
  .route("/")
  .get(courseController.getAllCourse)
  .post(
    authController.protect,
    authController.restrictTo("lecturer"),
    courseController.createCourse
  );

router
  .route("/:id")
  .get(courseController.getCourse)
  .patch(
    authController.protect,
    authController.restrictTo("lecturer"),
    courseController.updateCourse
  )
  .delete(
    authController.protect,
    authController.restrictTo("lecturer"),
    courseController.deleteCourse
  );

export { router as courseRouter };
