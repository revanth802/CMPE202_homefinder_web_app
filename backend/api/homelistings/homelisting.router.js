const router = require("express").Router();

console.log('homelistings api');
const {
    displayhomes,
} = require("./admin.service");



router.post("/", displayhomes);

module.exports = router;