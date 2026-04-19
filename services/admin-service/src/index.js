const express = require("express");
const morgan = require("morgan");
const adminRoutes = require("./api/routes");
const { errorHandler } = require("../../../shared/common/src");

const app = express();
const port = process.env.ADMIN_SERVICE_PORT || 3001;

app.use(express.json());
app.use(morgan("dev"));
app.use("/api/admin", adminRoutes);

app.get("/health", (_req, res) => {
  res.json({ service: "admin-service", status: "ok" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[admin-service] running on port ${port}`);
});
