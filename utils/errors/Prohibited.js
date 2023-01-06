module.exports = class Prohibited extends Error {
  constructor() {
    super('Запрещенный ресурс');
    this.statusCode = 403;
  }
};
