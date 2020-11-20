const router = require("express").Router();

console.log('homelistings api');
const {
    displayhomes,
    rentalListings,
    getListingDetails,
    submitLease
} = require("./homelisting.service");
router.post("/", displayhomes);
router.get("/rentalListings",rentalListings)
router.get("/getListingDetails",getListingDetails)
router.post("/submitLease",submitLease)
module.exports = router;