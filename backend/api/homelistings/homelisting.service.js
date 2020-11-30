const Homelistings = require("../../models/homelistings.js");

const leaseApplications = require("../../models/leaseApplications.js");

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
        // res.end(result);
        console.log("homelistings", result);
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
    });
    lease.save(function (err, results) {
      console.log("error:: ", err);
      console.log("results of submit lease", results);
      res.send(results);
      res.end();
    });
  },
};
