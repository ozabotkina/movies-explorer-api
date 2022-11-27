module.exports = class Conflict extends Error {
  constructor() {
    super('Такая запись уже есть');
    this.statusCode = 409;
  }
};
