import { check, validationResult } from 'express-validator';

const userValidationRules = () => [
  check('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  res.status(400).json({ errors: errors.array() });
};

export { userValidationRules, validate };
