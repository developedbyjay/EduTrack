import mongoose from "mongoose";
import User from "./base.user.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
import validator from "validator";

const staffSchema = new mongoose.Schema(
  {
    department: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);

const staff = User.discriminator("Staff", staffSchema);
export default staff;
