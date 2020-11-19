const router = require("express").Router();

console.log('admin api');
const {
    admin,
    remove,
    approve,
    reject
} = require("./admin.service");



router.post("/", admin);
router.post("/remove",remove);
router.post("/approve",approve);
router.post("/reject",reject);

module.exports = router;