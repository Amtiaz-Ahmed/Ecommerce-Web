const service = require("./service");

async function register(req, res, next) {
  try {
    const result = await service.register(req.body || {});
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const result = await service.login(req.body || {});
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const result = await service.me(req.headers.authorization);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const result = await service.refresh(req.body || {});
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function forgotPassword(req, res, next) {
  try {
    const result = await service.forgotPassword(req.body || {});
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, refresh, me, forgotPassword };
