module.exports = class NotAuthorized extends Error {
  constructor() {
    super();
    this.statusCode = 401;
    this.message = 'Ошибка авторизации';
  }
};
