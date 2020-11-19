const User = require("../../models/usermodel.js");


module.exports = {

    displayhomes: (req, res) => {
      
        // console.log("query here",req);
        User.find({}, (error, result) => {
        // res.end(result);
          console.log("users",result);
          res.send(result);
          res.end();
        });
      }
    }
    
  
  