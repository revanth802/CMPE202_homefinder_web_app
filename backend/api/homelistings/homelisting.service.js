const Homelistings = require("../../models/homelistings.js");


module.exports = {

    displayhomes: (req, res) => {
      
        // console.log("query here",req);
        Homelistings.find({}, (error, result) => {
        // res.end(result);
          console.log("homelistings",result);
          res.send(result);
          res.end();
        });
      }
    }
    
  
  