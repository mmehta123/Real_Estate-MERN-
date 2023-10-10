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
    const validPass = bcrypt.compareSync(password, user.password);
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
    const {password,...rest}=newUser._doc;
    return res.status(201).json({ success: true, user:rest });
  } catch (error) {
    return next(error);
  }
};

module.exports = { signIn, signUp };
