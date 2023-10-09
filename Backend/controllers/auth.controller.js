const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const errorHandler=require("../utils/error");

const signIn = async (req, res,next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(201).send("user not found");
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return next(error);
  }
};

const signUp = async (req, res,next) => {
  try {
    const hashedPass = bcrypt.hashSync(password, 10);
    const newUser = new userModel({ ...req.body, password: hashedPass });
    await newUser.save();
    return res.status(201).json({ success: true, newUser });
  } catch (error) {
    return next(error);
  }
};

module.exports = { signIn, signUp };
