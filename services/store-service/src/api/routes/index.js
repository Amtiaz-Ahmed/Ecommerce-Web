const router = require("express").Router();

router.use("/me", require("../../modules/me/routes"));
router.use("/", require("../../modules/browse/routes"));

module.exports = router;
