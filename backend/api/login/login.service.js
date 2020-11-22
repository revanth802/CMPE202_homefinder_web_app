const User = require("../../models/usermodel.js");


module.exports = {
 
    login: (req, res) => {
      User.findOne({ email: req.body.email, password: req.body.password }, (error, result) => {
        console.log(req.body)
        console.log("in login")
        if (error) {
          console.log(error);
          //callBack(error);
        } else {
          if (result && result != null) {
            res.cookie("cookie", "admin", {
              maxAge: 900000,
              httpOnly: false,
              path: "/"
            });
            res.cookie("userId", req.body._id, {
              maxAge: 900000,
              httpOnly: false,
              path: "/"
            });
            res.cookie("userType", req.body.userType, {
              maxAge: 900000,
              httpOnly: false,
              path: "/"
            });
  
            const payload = { _id: result._id };
        
            console.log(result);
            //res.body = user;
            return res.send(result);
          } else {
            res.writeHead(401, {
              'Content-Type': 'text/plain'
            })
            console.log('invalid');
            res.end("Invalid Credentials");
          }
        }
  
      });
    }
  }
  