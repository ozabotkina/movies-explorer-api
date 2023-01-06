require('dotenv').config();

const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = process.env;
const { DEV_SECRET } = require('../utils/dev_config');

const NotAuthorized = require('../utils/errors/NotAuthorized');
const Prohibited = require('../utils/errors/Prohibited');

const User = require('../models/user');

const tokenAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (!token) {
      throw new NotAuthorized();
    }
    const payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET);
    User.findOne({ _id: payload._id })
      .then((user) => {
        if (!user) { throw new Prohibited(); }
      });
    req.user = { _id: payload };
  } catch (err) {
    // next(new NotAuthorized());
    throw new NotAuthorized();
  }
  next();
};

module.exports = tokenAuth;
