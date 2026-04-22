const router = require("express").Router();
const controller = require("./controller");

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/refresh", controller.refresh);
router.get("/me", controller.me);
router.post("/forgot-password", controller.forgotPassword);

module.exports = router;
