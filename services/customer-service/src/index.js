const express = require("express");
const morgan = require("morgan");
const customerRoutes = require("./api/routes");
const { errorHandler } = require("../../../shared/common/src");

const app = express();
const port = process.env.CUSTOMER_SERVICE_PORT || 3002;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api", customerRoutes);

app.get("/health", (_req, res) => {
  res.json({ service: "customer-service", status: "ok" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[customer-service] running on port ${port}`);
});
