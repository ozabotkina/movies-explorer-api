require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const BadRequest = require('../utils/errors/BadRequest');
const NotAuthorized = require('../utils/errors/NotAuthorized');
const NotFound = require('../utils/errors/NotFound');
const Conflict = require('../utils/errors/Conflict');

const { JWT_SECRET, NODE_ENV } = process.env;
const { DEV_SECRET } = require('../utils/dev_config');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    }))
    .then(({
      name, email,
    }) => {
      res.status(200).send({
        name, email,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { return next(new BadRequest()); }
      if (err.code === 11000) { return next(new Conflict()); }
      return next(err);
    });
};

module.exports.currentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) { throw new NotFound(); }
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') { return next(new BadRequest()); }
      if (err.name === 'CastError') { return next(new BadRequest()); }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) { throw new NotAuthorized(); }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) { throw new NotAuthorized(); }
          return user;
        });
    })
    .then((user) => {
      const secretCode = NODE_ENV === 'production' ? JWT_SECRET : DEV_SECRET;
      const token = jwt.sign({ _id: user._id }, secretCode);
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      }).send({ message: 'токен сохранен в куках', token });
    })
    .catch(next);
};

module.exports.signout = (req, res) => {
  // try {
  // res.cookie('jwt', '', {
  //   maxAge: 3600000 * 24 * 7,
  //   httpOnly: true,
  //   secure: true,
  //   sameSite: 'none',
  // })
  res.clearCookie('jwt', {
    maxAge: 3600000 * 24 * 7,
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  })
    .send({ message: 'токен удален' });
  // } catch (err) { next(err); }
};
