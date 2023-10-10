const express = require("express");
const router = express.Router();
const { signIn, signUp ,googleOauth} = require("../controllers/auth.controller");

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/google", googleOauth);

module.exports = router;
