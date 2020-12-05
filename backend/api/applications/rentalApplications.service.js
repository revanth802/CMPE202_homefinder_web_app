// const Homelistings = require("../../models/leaseApplications.js");

const leaseApplications = require("../../models/leaseApplications.js");

module.exports = {
  getRentalApplications: (req, res) => {
    console.log("query here 11111", req.params.id, req.body, req.params);
    leaseApplications.find({ listingId: req.params.id }, (error, result) => {
      // res.end(result);
      console.log("rentalApplications", result);
      res.send(result);
      res.end();
    });
  },

  getMyApplications: (req, res) => {
    console.log("here my appns")
    leaseApplications.find({ actual_applicant: req.body.email }, (error, result) => {
      // 
      res.send(result);
      res.end();
    });
  },

  updateStatus: (req, res) => {
    // console.log("query here",req);
    console.log("update rental application status", req.body);
    leaseApplications.findOneAndUpdate(
      { _id: req.body.id },
      { status: req.body.status },
      (error, result) => {
        // res.end(result);
        console.log("updateStatus result::", result);
        res.send("success");
        res.end();
      }
    );
  },
};
