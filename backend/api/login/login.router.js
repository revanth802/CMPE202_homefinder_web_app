const router = require("express").Router();

console.log('test api');
const {
    login,
} = require("./login.service");



router.post("/", login);

module.exports = router;