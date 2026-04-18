const router = require("express").Router();
const controller = require("./controller");

router.get("/overview", controller.overview);
router.get("/revenue", controller.revenue);
router.get("/top-stores", controller.topStores);
router.get("/top-products", controller.topProducts);
router.get("/", controller.legacyAnalytics);

module.exports = router;
