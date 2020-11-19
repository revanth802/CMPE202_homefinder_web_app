const {
    admin,
    remove
} = require("./admin.service");
module.exports = {
    admin: (req, res) => {
        console.log("in admin controller")
        body = req.body
        admin(body, (err, results) => {
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
    remove: (req, res) => {
        console.log("in admin controller")
        body = req.body
        remove(body, (err, results) => {
            if (err) {
                console.log(err);
                return;
            }
            return res.json({
                success: 1,
                data: results
            });
        });
    }
}   