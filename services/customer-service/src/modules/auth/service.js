const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { prisma } = require("../../../../../shared/database/src/client");

const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "30d";

function signAccessToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
  );
}

function signRefreshToken(user) {
  const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  return jwt.sign({ sub: user.id, role: user.role }, refreshSecret, {
    expiresIn: REFRESH_TOKEN_EXPIRES_IN
  });
}

function buildTokenPair(user) {
  const accessToken = signAccessToken(user);
  const refreshToken = signRefreshToken(user);
  return {
    accessToken,
    refreshToken,
    tokenType: "Bearer",
    expiresIn: ACCESS_TOKEN_EXPIRES_IN
  };
}

async function register(payload) {
  const { email, password, name, role = "customer" } = payload;
  if (!email || !password) {
    const err = new Error("Email and password are required");
    err.statusCode = 400;
    throw err;
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    const err = new Error("Email already registered");
    err.statusCode = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { email, passwordHash, name: name || null, role },
    select: { id: true, email: true, name: true, role: true, createdAt: true }
  });

  const tokens = buildTokenPair(user);
  return { user, ...tokens };
}

async function login(payload) {
  const { email, password } = payload;
  if (!email || !password) {
    const err = new Error("Email and password are required");
    err.statusCode = 400;
    throw err;
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    const err = new Error("Invalid credentials");
    err.statusCode = 401;
    throw err;
  }

  const tokens = buildTokenPair(user);
  return {
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    ...tokens
  };
}

async function refresh(payload) {
  const { refreshToken } = payload;
  if (!refreshToken) {
    const err = new Error("Refresh token is required");
    err.statusCode = 400;
    throw err;
  }

  const refreshSecret = process.env.JWT_REFRESH_SECRET || process.env.JWT_SECRET;
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, refreshSecret);
  } catch (_err) {
    const err = new Error("Invalid or expired refresh token");
    err.statusCode = 401;
    throw err;
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(decoded.sub) },
    select: { id: true, email: true, name: true, role: true, isActive: true }
  });

  if (!user || !user.isActive) {
    const err = new Error("User is not active");
    err.statusCode = 401;
    throw err;
  }

  const tokens = buildTokenPair(user);
  return { user: { id: user.id, email: user.email, name: user.name, role: user.role }, ...tokens };
}

async function me(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    const err = new Error("Authorization token is required");
    err.statusCode = 401;
    throw err;
  }

  const token = authHeader.slice("Bearer ".length);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await prisma.user.findUnique({
    where: { id: Number(decoded.sub) },
    select: { id: true, email: true, name: true, role: true, isActive: true, createdAt: true }
  });

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  return { user };
}

function forgotPassword(_payload) {
  return { ok: true, message: "If email exists, reset instructions will be sent." };
}

module.exports = { register, login, refresh, me, forgotPassword };
