import Course from "../databases/models/course.model";
import factory from "../services/handler.service";
import moment from "moment";

const today = moment().format("dddd");

exports.getTodayCourse = (req, res, next) => {
  const query = { ...req.query };
  query["schedule.day"] = today;
  req.query = query;
  next();
};

exports.getAllCourse = factory.getAll(Course);
exports.getCourse = factory.getOne(Course);
exports.createCourse = factory.createOne(Course);
exports.updateCourse = factory.updateOne(Course);
exports.deleteCourse = factory.deleteOne(Tour);
