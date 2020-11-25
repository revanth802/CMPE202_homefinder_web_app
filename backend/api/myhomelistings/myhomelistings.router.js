const router = require("express").Router();

const {
    myhomelistings,
    remove,
    update
    // approve,
    // reject
} = require("./myhomelistings.service");



router.post("/", myhomelistings);
router.post("/remove",remove);
router.post("/update",update);
// router.post("/reject",reject);

module.exports = router;