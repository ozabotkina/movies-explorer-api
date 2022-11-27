module.exports = class NotAuthorized extends Error {
  constructor() {
    super('Ошибка авторизации');
    this.statusCode = 401;
  }
};
