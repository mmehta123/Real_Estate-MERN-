const express = require("express");
const cors = require("cors");
const colors = require("colors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");

const { connectDB } = require("./config/configDb");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const listingRoute = require("./routes/listing,route");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/listing", listingRoute);

// middleware for handling error
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error";
  return res.status(statusCode).json({ success: false, statusCode, message });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("server started at port ", PORT);
  connectDB();
});
