const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const User = require("../models/userModel");

const isVerifiedUser = async (req, res, next) => {
  try {
    // 1. extract token from cookies
    const accessToken = req.cookies?.accessToken;

    if (!accessToken) {
      return next(createHttpError(401, "No token provided"));
    }

    // 2. verify token using secret
    let decoded;
    try {
      decoded = jwt.verify(accessToken, config.accessTokenSecret);
    } catch (err) {
      return next(createHttpError(401, "Token expired or invalid"));
    }

    // 3. check if user still exists
    const user = await User.findById(decoded._id);
    if (!user) {
      return next(createHttpError(401, "User not found"));
    }

    req.user = user;

    next();
  } catch (err) {
    next(createHttpError(500, "Server error in token verification"));
  }
};

module.exports = { isVerifiedUser };
