const router = require("express").Router();

const {
    search,
    addToFavourites,
    myfavorites,
    myfavoriteSearches,
    getfavsearches,
    addToFavouriteHomes
} = require("./search.controller");



router.post("/", search);
router.post("/addToFavourites",addToFavourites)
router.post("/myfavorites",myfavorites)
router.post("/myfavoriteSearches",myfavoriteSearches)
router.post("/getfavsearches",getfavsearches)
router.post("/addToFavouriteHomes",addToFavouriteHomes)
module.exports = router;