const User = require("../../models/usermodel.js");
const Homelistings = require("../../models/homelistings.js");

module.exports = {

    myhomelistings: (req, res) => {
      
        // console.log("query here",req.body);
        Homelistings.find({owner: req.body.owner}, (error, result) => {
        // res.end(result);
          // console.log("my homelistings",result);
          res.send(result);
          res.end();
        });
      },

      remove: (req, res) => {
      
        // console.log("query here",req);
        console.log("remove listing", req.body)
        Homelistings.findOneAndDelete({_id:req.body.uname}, (error, result) => {
        // res.end(result);
          // console.log("users",result);
          res.send("success");
          res.end();
        });
      },

    //   reject: (req, res) => {
      
    //     // console.log("query here",req);
    //     console.log("remove user", req.body)
    //     User.findOneAndUpdate({email:req.body.uname},{status:"Rejected"} ,(error, result) => {
    //     // res.end(result);
    //       console.log("users",result);
    //       res.send("success");
    //       res.end();
    //     });
    //   },

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
    }
    
  
  