const router = require("express").Router();
const controller = require("./controller");

router.post("/checkout", controller.checkout);
router.get("/", controller.listOrders);
router.post("/:id/pay", controller.pay);
router.get("/:id", controller.getById);

module.exports = router;
