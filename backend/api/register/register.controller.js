const {
    register
} = require("./register.service");
module.exports = {
    register: (req, res) => {
        console.log("in register controller")
        body = req.body
        console.log(body);
        register(body, (err, results) => {
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
