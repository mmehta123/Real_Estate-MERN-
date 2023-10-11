const express = require("express");
const updateProfile = require("../controllers/user.controller");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

router.post("/update/:id", verifyToken, updateProfile);

module.exports = router;
