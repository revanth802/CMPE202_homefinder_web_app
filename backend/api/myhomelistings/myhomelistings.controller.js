const {
    myhomelistings,
    // remove,
    // approve,
    // reject
} = require("./myhomelistings.service");
module.exports = {
    myhomelistings: (req, res) => {
        console.log("in my controller")
        body = req.body
        myhomelistings(body, (err, results) => {
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
    update: (req, res) => {
        console.log("in update controller")
        body = req.body
        update(body, (err, results) => {
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
    // reject: (req, res) => {
    //     console.log("in admin controller")
    //     body = req.body
    //     reject(body, (err, results) => {
    //         if (err) {
    //             console.log(err);
    //             return;
    //         }
    //         return res.json({
    //             success: 1,
    //             data: results
    //         });
    //     });
    // }
}   