module.exports = function authenticate(req, _res, next) {
  req.user = req.user || null;
  next();
};
