import { body } from 'express-validator';
import User from "../../models/userModel.js";

const validateUser = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required.')
    .custom((value) => {
      if (value.split(' ').length < 2) {
        throw new Error('The name must have at least 2 words.');
      }
      return true;
    }),
  body('userName')
    .optional()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('The username has at least the characters a-z, A-Z, 0-9, -, and _')
    .custom(async (value) => {
      const user = await User.findOne({ userName: value });
      if (user) {
        throw new Error(`${value} Already used, choose another.`);
      }
      return true;
    }),
  body('email')
    .notEmpty()
    .withMessage('Email is required.')
    .isEmail()
    .withMessage('Incorrect email format.')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error(`${value} Already used, choose another.`);
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required.')
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!.])(?!.*\s).{8,}$/)
    .withMessage('Password must have at least 1 capital letter A-Z, 1 lowercase letter a-z, 1 digit 0-9, and 1 symbol @#$%^&+=!.'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('URL gambar tidak valid'),
  body('birthday')
    .notEmpty()
    .withMessage('Birthday is required.')
    .matches(/^\d{1,2}\/\d{1,2}\/\d{4}$/)
    .withMessage('Incorrect date format. An example of the correct format is 5/31/2006.'),
  body('role')
    .optional()
    .isIn(['siswa', 'guru', 'admin'])
    .withMessage('Invalid Role, Role must have data between siswa, guru, or admin.'),
];

export default validateUser;