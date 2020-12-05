const Homelistings = require("../../models/homelistings.js");

const leaseApplications = require("../../models/leaseApplications.js");

const scheduledVisits = require("../../models/scheduledVisits");

module.exports = {
  displayhomes: (req, res) => {
    // console.log("query here",req);
    Homelistings.find(
      { type: "sale", owner: { $ne: req.body.email } },
      (error, result) => {
        // res.end(result);
        console.log("sales homes");
        console.log("homelistings", result);
        res.send(result);
        res.end();
      }
    );
  },

  rentalListings: (req, res) => {
    // console.log("query here",req);
    Homelistings.find(
      { type: "rent", owner: { $ne: req.body.email } },
      (error, result) => {
        
        res.send(result);
        res.end();
      }
    );
  },

  getListingDetails: (req, res) => {
    // console.log("query here",req);
    var id = req.query.id;
    Homelistings.findById(id, (error, result) => {
      // res.end(result);
      console.log("homelistings", result);
      res.send(result.toObject());
      res.end();
    });
  },

  submitLease: (req, res) => {
    var lease = new leaseApplications({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      empName: req.body.empName,
      netIncome: req.body.netIncome,
      creditScore: req.body.creditScore,
      homeId: req.body.homeId,
      status: req.body.status,
      listingId: req.body.listingId,
      applicant:req.body.applicant,
      actual_applicant:req.body.actual_applicant
    });
    lease.save(function (err, results) {
      console.log("error:: ", err);
      console.log("results of submit lease", results);
      res.send(results);
      res.end();
    });
  },

  submitBuy: (req, res) => {
    var lease = new leaseApplications({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      offerPrice: req.body.offerPrice,
      listingId: req.body.listingId,
      applicant:req.body.applicant,
      actual_applicant:req.body.actual_applicant,
      type: "sale",
      status: req.body.status,
    });
    lease.save(function (err, results) {
      //console.log(results._id);
      // res.end(result);
      console.log("error:: ", err);
      console.log("results of submot buy", results);
      res.send(results);
      res.end();
    });
  },

  scheduleTour: (req, res) => {
    var visit = new scheduledVisits({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      dayOfVisit: req.body.dayOfVisit,
      homeId: req.body.homeId,
      listingId: req.body.homeId,
      timeOfVisit: req.body.timeOfVisit,
      type: req.body.type,
    });
    visit.save(function (err, results) {
      //console.log(results._id);
      // res.end(result);
      console.log("error:: ", err);
      console.log("results of submot buy", results);
      res.send(results);
      res.end();
    });
  },
};
