const User = require("../models/user.model");
const errorHandler = require("../utils/error");
const bcrypt = require("bcrypt");

const updateProfile = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Unauthorized"));
  }
  try {
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const user = await User.findById(req.params.id);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password ? req.body.password : user.password,
          avatar: req.body.avatar,
        },
      },
      {
        new: true,
      }
    );
    const { password, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Unauthorized"));
  }
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.clearCookie("access_token");
      return res
        .status(200)
        .json({ message: "User deleted succesfully" })
        .clearCookie("access_token");
    }
    return next(errorHandler(404, "User Not Found"));
  } catch (error) {
    next(error);
  }
};

module.exports = { updateProfile, deleteUser };
