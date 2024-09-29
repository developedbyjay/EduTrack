const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  date: { type: Date, required: true },
  present: { type: Boolean, default: false },
});

const attendance = mongoose.model("Attendance", attendanceSchema);
export default attendance;
