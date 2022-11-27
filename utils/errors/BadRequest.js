module.exports = class BadRequest extends Error {
  constructor() {
    super('Ошибка в запросе');
    this.statusCode = 400;
  }
};
