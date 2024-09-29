import Course from "../databases/models/course.model.js";
import factory from "../services/handler.service.js";
import moment from "moment";

const today = moment().format("dddd");

const getTodayCourse = (req, res, next) => {
  const query = { ...req.query };
  query["schedule.day"] = today;
  req.query = query;
  next();
};

const getAllCourse = factory.getAll(Course);
const getCourse = factory.getOne(Course);
const createCourse = factory.createOne(Course);
const updateCourse = factory.updateOne(Course);
const deleteCourse = factory.deleteOne(Course);

export default {
  getAllCourse,
  getCourse,
  getTodayCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
