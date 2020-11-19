const User = require("../../models/usermodel.js");


module.exports = {

    register: (req, res) => {
      
        let query= req.remail;
        console.log("query here",query);
        User.findOne({email: query}, (error, result) => {
          if (error) {
            console.log(error);
            //callBack(error);
          }else if (result && result != null){
            console.log('invalid');
            res.end("Invalid Credentials");
          }else {
            var newUserDetails = new User({
                email: req.remail, password: req.rpassword, name:req.rname, role:req.role
            });
        
            newUserDetails.save((error, data) => {
              if (error) {
                console.log('error', error);
                
                res.end("hghg");
              }
              else {
                console.log('data', data);
               
                res.end("ghgh");
              }
            });
          }
        });
      }
  }
  