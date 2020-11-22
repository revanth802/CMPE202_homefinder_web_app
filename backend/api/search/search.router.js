const router = require("express").Router();

const {
    search,
} = require("./search.controller");



router.post("/", search);

module.exports = router;