const router = require("express").Router();

console.log('email api');
const {
    email,
} = require("./email.service");



router.post("/sendEmail", email);

module.exports = router;