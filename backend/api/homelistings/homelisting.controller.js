const {
    displayhomes
} = require("./homelisting.service");
module.exports = {
    displayhomes: (req, res) => {
        console.log("in admin controller")
        body = req.body
        displayhomes(body, (err, results) => {
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