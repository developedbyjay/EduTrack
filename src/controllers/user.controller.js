import User from "../databases/models/user.model/base.user.js";
import catchAsync from "./../utils/catchAsync.js";
import factory from "../services/handler.service.js";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

const getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

const updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  const filteredBody = filterObj(req.body, "name", "email");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

const deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

const getAllUsers = catchAsync(async (req, res, next) => {
  const students = await User.find({ role: "Student" })
    .populate("courses")
    .populate("department");

  return res.status(200).json({ status: "success", data: { users: students } });
});

const getStudent = catchAsync(async (req, res, next) => {
  const student = await User.findOne({ _id: req.params.id, role: "Student" })
    .populate("courses")
    .populate("grades")
    .populate("attendance");

  return res.status(200).json({ status: "success", data: { user: student } });
});

const getStaff = catchAsync(async (req, res, next) => {
  const staff = await User.findOne({ _id: req.params.id, role: "Lecturer" })
    .populate("courses")
    .populate("department");

  return res.status(200).json({ status: "success", data: { user: staff } });
});

// Do NOT update passwords with this!
const updateUser = factory.updateOne(User);
// --------
const deleteUser = factory.deleteOne(User);

export default {
  updateMe,
  updateUser,
  deleteMe,
  deleteUser,
  getAllUsers,
  getMe,
  getStaff,
  getStudent,
};
