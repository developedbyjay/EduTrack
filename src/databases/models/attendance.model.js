import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    course: [
      {
        course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
        numberOfTimesPresent: {
          type: Number,
          default: 0,
        },
      },
    ],
    present: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const attendance = mongoose.model("Attendance", attendanceSchema);
export default attendance;
