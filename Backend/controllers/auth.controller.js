const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const errorHandler = require("../utils/error");
const jwt = require("jsonwebtoken");

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(errorHandler(404, "User Not Found!"));
    }
    const validPass = await bcrypt.compareSync(password, user.password);
    if (!validPass) {
      return next(errorHandler(401, "Invalid Password"));
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
    const { password: renamedpass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    return next(error);
  }
};

const signUp = async (req, res, next) => {
  try {
    const hashedPass = bcrypt.hashSync(req.body.password, 10);
    const newUser = new userModel({ ...req.body, password: hashedPass });
    await newUser.save();
    const { password, ...rest } = newUser._doc;
    return res.status(201).json({ success: true, user: rest });
  } catch (error) {
    return next(error);
  }
};

const googleOauth = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY);
      const { password: newPass, ...rest } = user._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcrypt.hashSync(generatePassword, 10);
      const newUser = new userModel({
        email: req.body.email,
        password: hashedPassword,
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        avatar: req.body.photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY);
      const { password: pass, ...rest } = newUser._doc;
      return res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    return next(error);
  }
};
const signOut = (req, res) => {
  res.clearCookie("access_token");
  return res.status(200).json({ message: "user signed out" });
};
module.exports = { signIn, signUp, googleOauth, signOut };
