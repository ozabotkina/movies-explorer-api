module.exports = class Prohibited extends Error {
  constructor() {
    super();
    this.statusCode = 403;
    this.message = 'Запрещенный ресурс';
  }
};
