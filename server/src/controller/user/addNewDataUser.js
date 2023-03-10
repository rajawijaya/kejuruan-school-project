import { validationResult } from "express-validator";
import User from "../../models/userModel.js";


const addNewDataUser = (req, res) => {
  const { name, userName, email, password, birthday, role } = req.body;
  const date = new Date(birthday)
  const dateFormattted = date.toLocaleDateString("id-ID", {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric"
  })
  
  const dataUser = {
    name,
    userName: userName || email.split("@")[0],
    email,
    password,
    imageUrl: null,
    birthday: dateFormattted,
    role
  }
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const err = new Error('gagal menambahkan akun, data tidak valid')
    err.errorStatus = 400
    err.data = errors.array()
    throw err
  }
  
  const addUser = new User(dataUser)
  
  addUser.save()
    .then(user => {
      res.status(201).json(
        {
          message: "success",
          error: false,
          data: user
        }
      )
    })
    .catch(err => {
      console.log(err);
      res.status(401).json(
        {
          message: "invalid value",
          error: true,
          data: err
        }
      )
    })
}

export default addNewDataUser