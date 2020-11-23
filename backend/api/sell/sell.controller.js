const {
  sell
} = require("./sell.service");
module.exports = {
  
  sell: (req, res) => {
      console.log("in sell controller")
      body = req.body
      sell(body, (err, results) => {
          if (err) {
              console.log(err);
              return;
          }
          return res.json({
              success: 1,
              data: results
          });
      });
  },
  
}   