import mongoose from "mongoose";
import User from "./base.user.js";

const studentSchema = new mongoose.Schema(
  {
    matric_no: {
      type: String,
      required: [true, "Please provide your matric number"],
    },
    department: {
      type: String,
      default: "Information and Communication Technology",
    },
    course_form: String,
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    enrolledDate: { type: Date, default: Date.now },
    level: {
      type: String,
      enum: ["100", "200", "300", "400", "500"],
      default: "100",
    },
    grades: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        score: Number,
        grade: String,
      },
    ],
    attendance: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Attendance" },
        date: { type: Date },
        present: { type: Boolean, default: false },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const student = User.discriminator("Student", studentSchema);
export default student;
