const router = require("express").Router();

router.use("/dashboard", require("../../modules/dashboard/routes"));
router.use("/analytics", require("../../modules/analytics/routes"));
router.use("/users", require("../../modules/users/routes"));
router.use("/stores", require("../../modules/stores/routes"));
router.use("/products", require("../../modules/products/routes"));
router.use("/orders", require("../../modules/orders/routes"));
router.use("/disputes", require("../../modules/disputes/routes"));
router.use("/discounts", require("../../modules/discounts/routes"));

module.exports = router;
