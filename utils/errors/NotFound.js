module.exports = class NotFound extends Error {
  constructor() {
    super('Не найден');
    this.statusCode = 404;
  }
};
