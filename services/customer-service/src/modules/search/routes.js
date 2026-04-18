const router = require("express").Router();
const controller = require("./controller");

router.get("/products", controller.searchProducts);
router.get("/suggestions", controller.suggestions);
router.get("/history", controller.history);
router.delete("/history/:id", controller.clearHistoryItem);
router.delete("/history", controller.clearAllHistory);

module.exports = router;
