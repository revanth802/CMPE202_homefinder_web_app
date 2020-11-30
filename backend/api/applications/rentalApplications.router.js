const router = require("express").Router();

console.log("Applications api");
const {
  // displayhomes,
  getRentalApplications,
  updateStatus,
  // getListingDetails,
  // submitLease,
} = require("./rentalApplications.service");
// router.post("/", displayhomes);
router.get("/rentalApplications/:id", getRentalApplications);
router.post("/updateStatus", updateStatus);
// router.get("/getListingDetails", getListingDetails);
// router.post("/submitLease", submitLease);
module.exports = router;
