const mongoose = require('mongoose');

// Article schema
const usersSchema = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  pin: {
    type: Number,
    required: true
  }
});

const Users = module.exports = mongoose.model('User', usersSchema);