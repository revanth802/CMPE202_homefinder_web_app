const router = require("express").Router();

console.log("Applications api");
const {
  // displayhomes,
  getRentalApplications,
  updateStatus,
  getMyApplications,
  // submitLease,
} = require("./rentalApplications.service");
// router.post("/", displayhomes);
router.get("/rentalApplications/:id", getRentalApplications);
router.post("/updateStatus", updateStatus);
router.post("/getMyApplications", getMyApplications);
// router.post("/submitLease", submitLease);
module.exports = router;
