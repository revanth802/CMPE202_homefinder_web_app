const router = require("express").Router();

const {
    login,
} = require("./login.service");



router.post("/", login);

module.exports = router;