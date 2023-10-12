const expres = require("express");
const createListing = require("../controllers/listing.controller");
const verifyToken = require("../utils/verifyToken");

const router = expres.Router();
router.post("/create", verifyToken, createListing);

module.exports = router;
