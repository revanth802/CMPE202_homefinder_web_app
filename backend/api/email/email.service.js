var nodemailer = require('nodemailer');

const Homelistings = require("../../models/homelistings.js");


var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noreply202proj@gmail.com',
      pass: 'Nope!202'
    }
  });

var types = ["leaseApplication", "homeOffer"]



module.exports = {

    email: (req, res) => {

        var type = req.body.emailType;
        var listingName = req.body.listingName;

        var html = `<h1>Hello,</h1>

<p>You have an ${type}  for the listing ${listingName}</p>

<p style = "color:red"> Please login to see the details :  </p>

<a href = "localhost:3000/login">Home App</a>

<p>Regards,</p>
<p>HomeApp</p>`;

var subject = `You have an ${type}`; 
        var mailOptions ={
            to:req.body.toEmail,
            html: html,
            subject:"You have a house offer !!"
        }
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info);
              console.log(info)
            }
            result = info.response
            res.send(result);
          res.end();
          });
      }
    }
    
  
  

