const jwt = require("jsonwebtoken");

module.exports = function authenticate(req, _res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const err = new Error("Authorization token is required");
    err.statusCode = 401;
    return next(err);
  }

  const token = authHeader.slice("Bearer ".length);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: Number(decoded.sub),
      email: decoded.email,
      role: decoded.role
    };
    return next();
  } catch (_err) {
    const err = new Error("Invalid or expired access token");
    err.statusCode = 401;
    return next(err);
  }
};
