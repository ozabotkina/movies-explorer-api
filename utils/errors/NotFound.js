module.exports = class NotFound extends Error {
  constructor() {
    super();
    this.statusCode = 404;
    this.message = 'Не найден';
  }
};
