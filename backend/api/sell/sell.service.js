const User = require("../../models/usermodel.js");
const Property = require("../../models/homelistings.js");
const { brotliDecompress } = require("zlib");

module.exports = {
  sell: (req, res) => {
    body = req.body;
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
      owner: body.person,
      representedBy: body.person,
      isOwnerRepresented: body.boo,
      parking: body.parking,
      securityDeposit: body.securityDeposit,
      availableDate: body.availableDate,
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
};
