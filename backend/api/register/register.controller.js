const User = require("../../models/usermodel.js");

module.exports = {
    register: (req, res) => {
        console.log("in register controller")
        body = req.body
        console.log(body);
            User.findOne({email: body.remail}, (error, result) => {
                if (error) {
                  console.log(error);
                  //callBack(error);
                  console.log("User already registered");
                }
                else if (result && result != null){
                  console.log('Registration Successfull');
                  res.end("success");
                }
                else {
                  var newUserDetails = new User({
                      email: body.remail, password: body.rpassword, name:body.rname, role:body.role,status:"Approved"
                  });
              
                  newUserDetails.save((error, data) => {
                    if (error) {
                      console.log('error', error);
                      
                      res.end("error");
                    }
                    else {
                      console.log('data', data);
                     
                      res.end();
                    }
                  });
                }
              });
    },
    }
