const router = require("express").Router();


const {
login,

} = require("./seller.controller");

 router.get("/getusercredentials/", login);

 module.exports = router;