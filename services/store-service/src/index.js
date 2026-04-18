const express = require("express");
const storeRoutes = require("./api/routes");
const { errorHandler } = require("../../../shared/common/src");

const app = express();
const port = process.env.STORE_SERVICE_PORT || 3003;

app.use(express.json());
app.use("/api/stores", storeRoutes);

app.get("/health", (_req, res) => {
  res.json({ service: "store-service", status: "ok" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[store-service] running on port ${port}`);
});
