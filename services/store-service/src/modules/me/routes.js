const router = require("express").Router();
const c = require("./controller");

router.put("/", c.updateStoreProfile);

router.get("/dashboard", c.dashboard);
router.get("/analytics", c.analytics);
router.get("/dashboard/sales", c.dashboardSales);
router.get("/dashboard/suggestions", c.dashboardSuggestions);

router.post("/products", c.createProduct);
router.put("/products/:id", c.updateProduct);
router.delete("/products/:id", c.deleteProduct);
router.patch("/products/:id/stock", c.patchStock);

router.get("/orders", c.orders);
router.put("/orders/:id/status", c.orderStatus);

router.get("/customers", c.customers);
router.get("/reviews", c.reviews);
router.get("/feedback", c.feedback);

router.post("/promotions", c.createPromotion);

router.post("/discounts", c.createDiscount);
router.get("/discounts", c.listDiscounts);
router.put("/discounts/:id", c.updateDiscount);
router.delete("/discounts/:id", c.deleteDiscount);
router.post("/discounts/:id/products", c.attachDiscountProducts);

module.exports = router;
