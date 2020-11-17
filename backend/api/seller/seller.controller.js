const {
    login,

    } = require("./seller.service");


    module.exports = {
      
        login: (req, res) => {
        const body = req.params.id;
        console.log("body",body)
  
        login(body,(err, results) => {
          if (err) {
            console.log(err);
            return;
          }
          else
          {
            // console.log("the results are",results)
          return res.json({
            success: 1,
            data: results
          });
          }
        });
      },
    }