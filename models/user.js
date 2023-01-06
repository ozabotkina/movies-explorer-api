const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимум 2 знака'],
    maxlength: [30, 'Максимум 30 знаков'],
  },

  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    validate: validator.isEmail,
  },

  password: {
    type: String,
    required: true,
    select: false,
  },

});

module.exports = mongoose.model('user', userSchema);
