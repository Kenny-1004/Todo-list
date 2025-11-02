const { body } = require('express-validator')

const userValidator = [
    body("username").notEmpty().trim()
        .isString().withMessage("username must be a string")
        .isLength({ max: 25 }).withMessage("username must not exceed 25 characters")
        .isLength({min: 10}).withMessage("username must be at least 10 characters"),
    body("password")
        .notEmpty().withMessage("Password is required")
        .isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
    }).withMessage("Password must be at least 10 characters and contains atleast 1 lowercase, 1 uppercase, 1 number, and 1 special character"),
]

module.exports = userValidator

