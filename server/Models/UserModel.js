const mongoose = require('mongoose');
const { Schema } = mongoose;

/**
 * User Schema
 * Email Required
 * Password Required
 */

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  friend: {
    type: String,
  },
  liked: {
    type: Array,
  },
  matched: {
    type: Boolean,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
