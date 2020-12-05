const homelistings = require("../../models/homelistings.js");
const User = require("../../models/usermodel.js");


module.exports = {

    admin: (req, res) => {
      
        // console.log("query here",req);
        User.find({"role" : { "$in": ["user", "realtor","User","Realtor"] }}, (error, result) => {
        // res.end(result);
          console.log("users",result);
          res.send(result);
          res.end();
        });
      },

      remove: (req, res) => {
      
        // console.log("query here",req);
        console.log("remove user", req.body)
        User.findOneAndDelete({email:req.body.uname}, (error, result) => {
        // res.end(result);
          console.log("users",result);
         
          // res.end();
        });

        homelistings.deleteMany({ $or:[ {owner: req.body.uname },{representedBy:req.body.uname}] }, (error, result) => {
        
          res.send("success");
          res.end();
        });


      },

      reject: (req, res) => {
      
        // console.log("query here",req);
        console.log("remove user", req.body)
        User.findOneAndUpdate({email:req.body.uname},{status:"Rejected"} ,(error, result) => {
        // res.end(result);
          console.log("users",result);
          res.send("success");
          res.end();
        });
      },

      approve: (req, res) => {
      
        // console.log("query here",req);
        console.log("remove user", req.body)
        User.findOneAndUpdate({email:req.body.uname},{status:"Approved"} ,(error, result) => {
        // res.end(result);
          console.log("users",result);
          res.send("success");
          res.end();
        });
      }
    }
    
  
  