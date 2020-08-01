const { check, validationResult } = require('express-validator');
const User = require("./models/User");
const userValidationRules = () => {
  return [
    
    check('email')
      .custom(value => {
        return User.findOne({email: value}).then(user => {
          if (user) {
            return Promise.reject('This email is already associated with an account.');
          }
        })
      })
      .isEmail().withMessage('Invalid email')
      .notEmpty().withMessage('Email field cannot be empty'),
    
    check('password')
      .notEmpty().withMessage('Password field cannot be empty')
      .isLength({ min: 6, max: 16 }).withMessage('Password must be between 6 to 16 characters'),
    
    check('passwordConfirm')
      .notEmpty().withMessage('Password Confirmation cannot be empty')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          return Promise.reject('Passwords do not match');
        }
        return true;
      }),
    
    check('name')
      .isLength({ min: 2, max: 60 }).withMessage("Name must be between 2 to 60 characters in length")
      .matches(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/).withMessage("Invalid name")
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
  console.log(errors);

  return res.render('register', { title: "Registration failed", errors: errors.errors });
}

module.exports = {
  userValidationRules,
  validate
}