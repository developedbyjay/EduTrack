import User from "../databases/models/user.model/base.user";
import catchAsync from "./../utils/catchAsync";
import factory from "../services/handler.service";

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
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

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined! Please use /signup instead",
  });
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const students = await User.find({ role: "Student" })
    .populate("courses")
    .populate("department");

  return res.status(200).json({ status: "success", data: { users: students } });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const student = await User.findOne({ _id: req.params.id, role: "Student" })
    .populate("courses")
    .populate("department");

  return res.status(200).json({ status: "success", data: { user: student } });
});

// Do NOT update passwords with this!
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);
