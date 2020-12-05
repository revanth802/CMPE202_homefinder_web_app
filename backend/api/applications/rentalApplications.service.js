// const Homelistings = require("../../models/leaseApplications.js");

const leaseApplications = require("../../models/leaseApplications.js");
const homelistingsSchema = require("../../models/homelistings.js");

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
    console.log("here my appns");
    leaseApplications.find(
      {
        $or: [
          { actual_applicant: req.body.email },
          { applicant: req.body.email },
        ],
      },
      (error, result) => {
        //
        res.send(result);
        res.end();
      }
    );
  },

  // updateStatus: (req, res) => {
  //   // console.log("query here",req);
  //   console.log("update rental application status", req.body);
  //   leaseApplications.findOneAndUpdate(
  //     { _id: req.body.id },
  //     { status: req.body.status },
  //     (error, result) => {
  //       var listing_status = "";
  //       if ("pending" == req.body.status) listing_status = "open";
  //       else if ("approve" == req.body.status) listing_status = "sold";
  //       else if ("reject" == req.body.status) listing_status = "open";
  //       console.log("listing_status:::::::", listing_status);
  //       homelistingsSchema.findOneAndUpdate(
  //         { _id: req.body.listingId },
  //         { status: listing_status }
  //       );
  //       // res.end(result);
  //       console.log("updateStatus result::", result);
  //       res.send("success");
  //       res.end();
  //     }
  //   );
  // },

  updateStatus: (req, res) => {
    var listing_status = "";
    if ("pending" == req.body.status) listing_status = "open";
    else if ("approve" == req.body.status) listing_status = "sold";
    else if ("reject" == req.body.status) listing_status = "open";
    // console.log("listing_status:::::::", listing_status);
    // console.log("update rental application status", req.body);
    leaseApplications
      .findOneAndUpdate({ _id: req.body.id }, { status: req.body.status })
      .then((leaseApplicationsResult) => {
        console.log("leaseApplications result:: ", leaseApplicationsResult);
        return homelistingsSchema.findOneAndUpdate(
          { _id: req.body.listingId },
          { status: listing_status }
        );
      })
      .then((result) => {
        // console.log("updateStatus result::", result);
        res.send("success");
        res.end();
      })
      .catch((e) => {
        console.log("updateStatus", e);
      });
  },
};
