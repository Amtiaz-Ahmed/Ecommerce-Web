const router = require("express").Router();
const controller = require("./controller");
const { authenticate, authorize } = require("../../../../../shared/common/src");

router.get("/", controller.listStores);
router.post("/", authenticate, authorize(["store_owner", "admin"]), controller.createStore);
router.get("/:slug/feedback", controller.storeFeedback);
router.get("/:slug/products", controller.storeProducts);
router.get("/:slug", controller.storeBySlug);

module.exports = router;
