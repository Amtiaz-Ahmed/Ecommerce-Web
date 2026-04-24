const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const storeRoutes = require("./api/routes");
const { errorHandler } = require("../../../shared/common/src");

const app = express();
const port = process.env.STORE_SERVICE_PORT || 3003;
const multipartParser = multer({ storage: multer.memoryStorage() });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.is("multipart/form-data")) {
    return multipartParser.any()(req, res, next);
  }
  return next();
});
app.use("/api/stores", storeRoutes);

app.get("/health", (_req, res) => {
  res.json({ service: "store-service", status: "ok" });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`[store-service] running on port ${port}`);
});
