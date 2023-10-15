const expres = require("express");
const {createListing,getListing,deleteListing} = require("../controllers/listing.controller");
const verifyToken = require("../utils/verifyToken");

const router = expres.Router();
router.post("/create", verifyToken, createListing);
router.get("/getlisting/:id", verifyToken, getListing);
router.delete("/deletelisting/:id", verifyToken, deleteListing);

module.exports = router;
