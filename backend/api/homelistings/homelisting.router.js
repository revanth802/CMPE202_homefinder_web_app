const router = require("express").Router();

console.log('homelistings api');
const {
    displayhomes,
    rentalListings,
    getListingDetails,
    submitLease,
    submitBuy,
    scheduleTour
} = require("./homelisting.service");
router.post("/", displayhomes);
router.post("/rentalListings",rentalListings)
router.get("/getListingDetails",getListingDetails)
router.post("/submitLease",submitLease)
router.post("/submitBuy",submitBuy)
router.post("/scheduleTour",scheduleTour)
module.exports = router;