module.exports = class BadRequest extends Error {
  constructor() {
    super();
    this.statusCode = 400;
    this.message = 'Ошибка в запросе';
  }
};
