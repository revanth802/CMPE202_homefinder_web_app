const router = require("express").Router();

const {
    search,
    addToFavourites,
    myfavorites
} = require("./search.controller");



router.post("/", search);
router.post("/addToFavourites",addToFavourites)
router.post("/myfavorites",myfavorites)

module.exports = router;