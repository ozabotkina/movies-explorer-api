require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
// const routerUsers = require('./routes/users');
// const routerMovies = require('./routes/movies');
// const routerEntrance = require('./routes/entrance');
// const tokenAuth = require('./middlewares/auth');
// const NotFound = require('./utils/errors/NotFound');
const routers = require('./routes/index');

const { requestLogger, errorLogger } = require('./middlewares/loggers');

// const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
});

app.use(requestLogger);
// app.use(cors);

// app.get('/crash-test', () => {
//   setTimeout(() => {
//     throw new Error('Сервер сейчас упадёт');
//   }, 0);
// });

// app.use('/', routerEntrance);
// app.use('/movies', tokenAuth, routerMovies);
// app.use('/users', tokenAuth, routerUsers);
// app.use('/*', tokenAuth, () => {
//   throw new NotFound();
// });

app.use('/', routers);

app.use(errorLogger);
app.use(errors());
// Надо бы вынести в отдельный app.use(myerrors);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        // ? message
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
