const {
    login,
} = require("./login.service");
module.exports = {
    login: (req, res) => {
        console.log("in login controller")
        body = req.body
        login(body, (err, results) => {
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