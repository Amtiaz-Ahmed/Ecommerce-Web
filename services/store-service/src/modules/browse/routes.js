const router = require("express").Router();
const controller = require("./controller");

router.get("/", controller.listStores);
router.post("/", controller.createStore);
router.get("/:slug/feedback", controller.storeFeedback);
router.get("/:slug/products", controller.storeProducts);
router.get("/:slug", controller.storeBySlug);

module.exports = router;
