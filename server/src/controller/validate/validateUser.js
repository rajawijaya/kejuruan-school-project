import { body } from 'express-validator';
import User from "../../models/userModel.js";

const validateUser = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nama harus diisi')
    .custom((value) => {
      if (value.split(' ').length < 2) {
        throw new Error('Nama harus memiliki minimal 2 kata');
      }
      return true;
    }),
  body('userName')
    .optional()
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('Karakter yang diperbolehkan untuk username adalah a-z, A-Z, 0-9, -, dan _')
    .custom(async (value) => {
      const user = await User.findOne({ userName: value });
      if (user) {
        throw new Error(`${value} sudah digunakan, silakan pilih yang lain!`);
      }
      return true;
    }),
  body('email')
    .notEmpty()
    .withMessage('Email harus diisi')
    .isEmail()
    .withMessage('Format email salah')
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error(`${value} sudah digunakan, silakan pilih yang lain!`);
      }
      return true;
    }),
  body('password')
    .notEmpty()
    .withMessage('Password harus diisi')
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!.])(?!.*\s).{8,}$/)
    .withMessage('Password harus memiliki setidaknya 1 huruf kapital A-Z, 1 huruf kecil a-z, 1 angka 0-9, dan 1 simbol @#$%^&+=!.'),
  body('imageUrl')
    .optional()
    .isURL()
    .withMessage('URL gambar tidak valid'),
  body('birthday')
    .notEmpty()
    .withMessage('Tanggal lahir harus diisi')
    .matches(/^\d{1,2}\/\d{1,2}\/\d{4}$/)
    .withMessage('Format tanggal salah. Contoh format yang benar adalah "5/31/2006".'),
  body('role')
    .optional()
    .isIn(['siswa', 'guru', 'admin'])
    .withMessage('Role tidak valid'),
];

export default validateUser;