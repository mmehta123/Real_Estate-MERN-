const expres = require("express");
const {
  createListing,
  getListing,
  deleteListing,
  updateListing,
  getSingleListing,
} = require("../controllers/listing.controller");
const verifyToken = require("../utils/verifyToken");

const router = expres.Router();
router.post("/create", verifyToken, createListing);
router.get("/getlisting/:id", verifyToken, getListing);
router.delete("/deletelisting/:id", verifyToken, deleteListing);
router.put("/updatelisting/:id", verifyToken, updateListing);
router.get("/getsinglelisting/:id", verifyToken, getSingleListing);

module.exports = router;
