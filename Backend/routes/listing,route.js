const expres = require("express");
const {
  createListing,
  getListing,
  deleteListing,
  updateListing,
  getSingleListing,
  getSearchedListings,
} = require("../controllers/listing.controller");
const verifyToken = require("../utils/verifyToken");

const router = expres.Router();
router.post("/create", verifyToken, createListing);
router.get("/getlisting/:id", getListing);
router.get("/getlisting/:id", getSearchedListings);
router.delete("/deletelisting/:id", verifyToken, deleteListing);
router.post("/updatelisting/:id", verifyToken, updateListing);
router.get("/getsinglelisting/:id", verifyToken, getSingleListing);

module.exports = router;
