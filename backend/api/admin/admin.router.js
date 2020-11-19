const router = require("express").Router();

console.log('admin api');
const {
    admin,
    remove,
} = require("./admin.service");



router.post("/", admin);
router.post("/remove",remove);

module.exports = router;