const router = require("express").Router();
const { authenticate, authorize } = require("../../../../../shared/common/src");

router.use("/me", authenticate, authorize(["store_owner", "admin"]), require("../../modules/me/routes"));
router.use("/", require("../../modules/browse/routes"));

module.exports = router;
