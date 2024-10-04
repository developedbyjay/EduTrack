import Attendance from "../databases/models/attendance.model.js";
import factory from "../services/handler.service.js";

const getAllAttendance = factory.getAll(Attendance);
const getAttendance = factory.getOne(Attendance);
const createAttendance = factory.createOne(Attendance);
const updateAttendance = factory.updateOne(Attendance);
const deleteAttendance = factory.deleteOne(Attendance);

export default {
  getAllAttendance,
  getAttendance,
  createAttendance,
  updateAttendance,
  deleteAttendance,
};
