const router = require("express").Router();

console.log('homelistings api');
const {
    displayhomes,
} = require("./homelisting.service");
router.post("/", displayhomes);
module.exports = router;