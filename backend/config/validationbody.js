const { body } = require('express-validator');

exports.createUserValidator = [
  body('email', 'Email is invalid').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 }),
  body('confirmPassword', 'Confirm password must be at least 6 characters').isLength({ min: 6 })
];

exports.loginValidator = [
  body('email', 'Email is invalid').isEmail(),
  body('password', 'Password must be at least 6 characters').isLength({ min: 6 })
];
