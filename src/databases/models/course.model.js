import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true, unique: true },
  courseName: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  creditUnits: { type: Number, required: true },
  lecturer: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff" }],
  semester: { type: String, enum: ["First", "Second"], required: true },
  schedule: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: true,
      },
      time: String,
    },
  ],
});

const course = mongoose.model("Course", courseSchema);
export default course;
