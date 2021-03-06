const User = require("../../models/usermodel.js");
const Homelistings = require("../../models/homelistings.js");
const leaseApplications = require("../../models/leaseApplications.js");
const favouriteHomes= require("../../models/favouriteHomes.js");
module.exports = {
  myhomelistings: (req, res) => {
    // console.log("query here",req.body);
    Homelistings.find({ $or:[ {owner: req.body.owner },{representedBy:req.body.owner}] }, (error, result) => {
      // res.end(result);
      // console.log("my homelistings",result);
      res.send(result);
      res.end();
    });
  },

  remove: (req, res) => {
    // console.log("query here",req);
    console.log("remove listing", req.body);
    Homelistings.findOneAndDelete({ _id: req.body.uname }, (error, result) => {
      // res.end(result);
      // console.log("users",result);
      // res.end();
    });

    leaseApplications.deleteMany({ listingId: req.body.uname }, (error, result) => {
      
      // res.send("success");
      // res.end();
    });

    favouriteHomes.deleteMany({ houseId: req.body.uname }, (error, result) => {
      
      // res.send("success");
    
    });
    res.send("success")
    // res.end();

  },

  update: (req, res) => {
    // console.log("query here",req);
    console.log("UPDATE LISTING", req.body);
    body = req.body;
    Homelistings.findOneAndUpdate(
      { _id: body.listingId },
      {
        addressLine1: body.add1,
        addressLine2: body.add2,
        city: body.city,
        state: body.statex,
        zipcode: body.zipcode,
        area: body.area,
        bedrooms: body.beds,
        bathrooms: body.baths,
        hometype: body.propertyTypes,
        flooring: body.floor,
        year_built: body.year,
        amenities: body.amenities,
        price: body.price,
        leaseTerms: body.terms,
        availableDate: body.availableDate,
        securityDeposit: body.securityDeposit,
        status:body.status,

        parking: body.parking,
      },
      (error, result) => {
        // res.end(result);
        // console.log("users",result);
        res.send("success");
        res.end();
      }
    );
  },

  //   approve: (req, res) => {

  //     // console.log("query here",req);
  //     console.log("remove user", req.body)
  //     User.findOneAndUpdate({email:req.body.uname},{status:"Approved"} ,(error, result) => {
  //     // res.end(result);
  //       console.log("users",result);
  //       res.send("success");
  //       res.end();
  //     });
  //   }
};
