const router = require("express").Router();

const {
    sell
} = require("./sell.service");



router.post("/", sell);

module.exports = router;