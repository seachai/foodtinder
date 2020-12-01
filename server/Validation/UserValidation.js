const validator = require('validator');

exports.validateEmail = async (req, res, next) => {
  try {
    const isEmail = validator.isEmail();
    if (isEmail) {
      return next();
    }
    throw new Error('Email is not valid.');
  } catch (err) {
    return next(err);
  }
};
