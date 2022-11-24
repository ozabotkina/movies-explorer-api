require('dotenv').config();

const jwt = require('jsonwebtoken');

// const { JWT_SECRET, NODE_ENV } = process.env;

const NotAuthorized = require('../utils/errors/NotAuthorized');
const Prohibited = require('../utils/errors/Prohibited');

const User = require('../models/user');

const tokenAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (!token) {
      throw new NotAuthorized();
    }
    // let payload;
    const payload = jwt.verify(token, 'dev-secret');
    // NODE_ENV === 'production' ? JWT_SECRET :
    User.findOne({ _id: payload._id })
      .then((user) => {
        if (!user) { throw new Prohibited(); }
      });
    req.user = { _id: payload };
  } catch (err) {
    next(new NotAuthorized());
  }
  next();
};

module.exports = tokenAuth;
