const router = require("express").Router();
const controller = require("./controller");

router.get("/category/:slug", controller.byCategorySlug);
router.get("/:id/feedback", controller.productFeedback);
router.get("/:id", controller.getById);
router.get("/", controller.listProducts);

module.exports = router;
