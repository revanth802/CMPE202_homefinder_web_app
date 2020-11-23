const User = require("../../models/usermodel.js");
const Property= require("../../models/homelistings.js");
const { brotliDecompress } = require("zlib");

module.exports = {

    sell: (req, res) => {
      body=req.body
      var newUserDetails = new Property({
        type:"sale",
        addressLine1: body.add1,
         addressLine2: body.add2, 
         city:body.city,
          state:body.statex,
          zipcode:body.zipcode,
          area:body.area,
        bedrooms:body.beds,
        bathrooms:body.baths,
         hometype:body.propertyTypes,
          flooring:body.floor,
           year_built: body.year,
        amenities:body.amenities
        ,price:body.price,
        leaseTerms:body.terms,
        representedBy: body.person,
        isOwnerRepresented: body.boo,
        parking:body.parking,
    });

    newUserDetails.save((error, data) => {
      if (error) {
        console.log('error', error);
        
        res.end("error");
      }
      else {
        console.log("success");
       res.send("success")
        res.end();
      }
    });
      },

    }
    
  
  