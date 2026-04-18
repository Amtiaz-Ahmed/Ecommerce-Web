const router = require("express").Router();

router.use("/dashboard", require("../../modules/dashboard/routes"));
router.use("/search", require("../../modules/search/routes"));
router.use("/recommendations", require("../../modules/recommendations/routes"));
router.use("/ai", require("../../modules/ai/routes"));
router.use("/feedback", require("../../modules/feedback/routes"));
router.use("/discounts", require("../../modules/discount/routes"));
router.use("/cart", require("../../modules/cart/routes"));
router.use("/wishlist", require("../../modules/wishlist/routes"));
router.use("/categories", require("../../modules/categories/routes"));
router.use("/products", require("../../modules/product/routes"));
router.use("/orders", require("../../modules/orders/routes"));
router.use("/payments", require("../../modules/payment/routes"));
router.use("/reviews", require("../../modules/reviews/routes"));

module.exports = router;
