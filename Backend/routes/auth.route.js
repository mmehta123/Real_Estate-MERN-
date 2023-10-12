const express = require("express");
const router = express.Router();
const {
  signIn,
  signUp,
  googleOauth,
  signOut,
} = require("../controllers/auth.controller");

router.post("/signin", signIn);
router.post("/signup", signUp);
router.post("/google", googleOauth);
router.get("/signout", signOut);

module.exports = router;
