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
      status:"open"
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
  },

  const { awsBucket, awsAccessKey, awsSecretAccessKey, awsPermission } = require('./config');
const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: awsAccessKey,
    secretAccessKey: awsSecretAccessKey
});

const deleteFile = (file) => {
    fs.unlink(file.path, function (err) {
        if (err) {
            console.log(err);
        }
    });
}

function uploadFileToS3(buffer, name, type,param) {

    //const fileContent  = Buffer.from(req.files.uploadedFileName.data, 'binary');
    let promise = new Promise((resolve, reject) => {

        let params;
        if(param === "user"){
         params = {
            ACL: 'public-read',
            Body: buffer,
            Bucket: awsBucket +"/users",
            ContentType: type.mime,
            Key: `${name}.${type}`
          };
        }else if (param === "product"){
             params = {
                ACL: 'public-read',
                Body: buffer,
                Bucket: awsBucket +"/products",
                ContentType: type.mime,
                Key: `${name}.${type}`
              }; 
        }
        
        
        s3.upload(params, (s3Err, resp) => {
            if (s3Err) {
                console.log("error in upload: ",s3Err);
                //deleteFile(file);
                reject(s3Err);
            }
            else {
                imageUrl = resp.Location;
                //deleteFile(file);
                resolve(resp);
            }
          });
        // s3.upload(params, function (s3Err, resp) {
        //     if (s3Err) {
                
        //     } else {
                
        //     }
        // });
    });
    return promise;
};




};
