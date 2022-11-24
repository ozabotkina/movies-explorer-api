module.exports = class Conflict extends Error {
  constructor() {
    super();
    this.statusCode = 409;
    this.message = 'Такая запись уже есть';
  }
};
