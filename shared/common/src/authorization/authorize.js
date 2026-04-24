module.exports = function authorize(roles = []) {
  return (req, _res, next) => {
    if (!req.user) {
      const err = new Error("Unauthorized");
      err.statusCode = 401;
      return next(err);
    }

    if (!roles.length) return next();

    if (!roles.includes(req.user.role)) {
      const err = new Error("Forbidden: role permissions");
      err.statusCode = 403;
      return next(err);
    }

    return next();
  };
};
