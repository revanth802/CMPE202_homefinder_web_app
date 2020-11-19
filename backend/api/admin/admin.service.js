const User = require("../../models/usermodel.js");


module.exports = {

    admin: (req, res) => {
      
        // console.log("query here",req);
        User.find({}, (error, result) => {
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
          res.send("success");
          res.end();
        });
      }
    }
    
  
  