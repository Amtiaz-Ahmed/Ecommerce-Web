const router = require("express").Router();
const { authenticate, authorize } = require("../../../../../shared/common/src");

router.use("/auth", require("../../modules/auth/routes"));
router.use("/dashboard", require("../../modules/dashboard/routes"));
router.use("/search", require("../../modules/search/routes"));
router.use("/recommendations", authenticate, authorize(["customer", "store_owner", "admin"]), require("../../modules/recommendations/routes"));
router.use("/ai", authenticate, authorize(["customer", "store_owner", "admin"]), require("../../modules/ai/routes"));
router.use("/feedback", authenticate, authorize(["customer", "store_owner", "admin"]), require("../../modules/feedback/routes"));
router.use("/discounts", authenticate, authorize(["customer", "store_owner", "admin"]), require("../../modules/discount/routes"));
router.use("/cart", authenticate, authorize(["customer", "store_owner", "admin"]), require("../../modules/cart/routes"));
router.use("/wishlist", authenticate, authorize(["customer", "store_owner", "admin"]), require("../../modules/wishlist/routes"));
router.use("/categories", require("../../modules/categories/routes"));
router.use("/products", require("../../modules/product/routes"));
router.use("/orders", authenticate, authorize(["customer", "store_owner", "admin"]), require("../../modules/orders/routes"));
router.use("/payments", authenticate, authorize(["customer", "store_owner", "admin"]), require("../../modules/payment/routes"));
router.use("/reviews", authenticate, authorize(["customer", "store_owner", "admin"]), require("../../modules/reviews/routes"));

module.exports = router;
