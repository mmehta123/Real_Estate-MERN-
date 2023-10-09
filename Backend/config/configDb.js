const mongoose = require("mongoose");
const colors = require("colors");

exports.connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`server is connected with db`.bgBlue);
  } catch (e) {
    console.log(`${e}`.bgRed);
  }
};
