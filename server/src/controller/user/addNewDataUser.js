import { validationResult } from "express-validator";
import bcrypt from "bcrypt"
import User from "../../models/userModel.js";



const addNewDataUser = async (req, res) => {
  const { name, userName, email, password, birthday, role } = req.body;
  const date = new Date(birthday)
  const dateFormattted = date.toLocaleDateString("id-ID", {
    weekday: "long",
    month: "long",
    year: "numeric",
    day: "numeric"
  })
  const passHashed = await bcrypt.hash(password, 10)
  
  const dataUser = {
    name,
    userName: userName || email.split("@")[0],
    email,
    password: passHashed,
    imageUrl: null,
    birthday: dateFormattted,
    role
  }
  
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    const err = new Error('Failed to add account, invalid data.')
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
          status: 201,
          data: user
        }
      )
    })
    .catch(err => {
      console.log(err);
      res.status(401).json(
        {
          message: "failed",
          error: true,
          errorMsg: err
        }
      )
    })
}

export default addNewDataUser