import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  departmentName: { type: String, required: true, unique: true },
  hod: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
  staff: [{ type: mongoose.Schema.Types.ObjectId, ref: "Staff" }],
});

const department = mongoose.model("Department", departmentSchema);

export default department;
