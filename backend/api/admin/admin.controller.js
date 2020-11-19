const {
    admin,
    remove,
    approve,
    reject
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
    },
    approve: (req, res) => {
        console.log("in admin controller")
        body = req.body
        approve(body, (err, results) => {
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
    reject: (req, res) => {
        console.log("in admin controller")
        body = req.body
        reject(body, (err, results) => {
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