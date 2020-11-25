const router = require("express").Router();

const {
    myhomelistings,
    remove,
    // approve,
    // reject
} = require("./myhomelistings.service");



router.post("/", myhomelistings);
router.post("/remove",remove);
// router.post("/approve",approve);
// router.post("/reject",reject);

module.exports = router;