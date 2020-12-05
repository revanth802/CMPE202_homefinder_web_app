const User = require("../../models/usermodel.js");
const Property = require("../../models/homelistings.js");
const { brotliDecompress } = require("zlib");
const Homelistings = require("../../models/homelistings.js");





module.exports = {
  sell: (req, res) => {
    body = req.body;
    var owner;
    if(req.body.owner == "")
    {
      req.body.owner = req.body.person
    }
    console.log(req.body);
    var newUserDetails = new Property({
      type: body.type,
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
      owner: body.owner,
      representedBy: body.person,
      isOwnerRepresented: body.boo,
      parking: body.parking,
      securityDeposit: body.securityDeposit,
      availableDate: body.availableDate,
      status:"open",
      imagePath:body.imagePath
    });

    newUserDetails.save((error, data) => {
      
      if (error) {
        console.log("error", error);

        res.end("error");
      } else {
        console.log("success");
        res.send("success");
        res.end();
      }
    });
  },


  getOwners : (req, res) => {
    body = req.body;
    User.distinct("email", {role:"user"} ,(error, result) => {
      // res.end(result);
      console.log("my homelistings",result);
      res.send(result);
      res.end();
    });
    // Homelistings.distinct("owner",{},)
    // res.send();
  }

};

