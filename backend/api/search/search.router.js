const router = require("express").Router();

const {
    search,
    addToFavourites,
    myfavorites,
    myfavoriteSearches
} = require("./search.controller");



router.post("/", search);
router.post("/addToFavourites",addToFavourites)
router.post("/myfavorites",myfavorites)
router.post("/myfavoriteSearches",myfavoriteSearches)

module.exports = router;