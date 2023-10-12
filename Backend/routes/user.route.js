const express = require("express");
const { updateProfile, deleteUser } = require("../controllers/user.controller");
const verifyToken = require("../utils/verifyToken");
const router = express.Router();

router.post("/update/:id", verifyToken, updateProfile);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
