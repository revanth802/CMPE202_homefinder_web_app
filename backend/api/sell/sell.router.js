const router = require("express").Router();

const {
    sell,
    getOwners
} = require("./sell.service");



router.post("/", sell);

router.get("/getOwners",getOwners)
module.exports = router;