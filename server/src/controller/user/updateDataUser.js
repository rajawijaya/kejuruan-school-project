import { validationResult } from "express-validator";
import User from "../../models/userModel.js";


const updateDataUser = (req, res) => {
  const { id } = req.params
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
    const err = new Error('Failed to update account, invalid data.')
    err.errorStatus = 400
    err.data = errors.array()
    throw err
  }
  
  
  User.findOneAndUpdate({_id: id}, dataUser, {new: true})
    .then(user => {
      res.status(201).json(
        {
          message: "Success",
          error: false,
          status: 201,
          data: user
        }
      )
    })
    .catch(err => {
      res.status(404).json(
        {
          message: "Failed, an error occurred while updating the data.",
          error: true,
          status: 404,
          errorMsg: err
        }
      )
    })
}

export default updateDataUser