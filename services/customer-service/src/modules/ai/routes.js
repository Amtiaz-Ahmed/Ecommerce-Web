const router = require("express").Router();
const controller = require("./controller");

router.post("/discover", controller.discover);
router.get("/suggestions/dashboard", controller.suggestionsDashboard);

module.exports = router;
