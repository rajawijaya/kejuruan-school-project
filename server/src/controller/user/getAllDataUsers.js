import userModel from "../../models/userModel.js";


const getAllDataUsers = (req, res) => {
  userModel.find()
    .then(users => {
      res.status(200).json({
        message: 'success',
        error: false,
        data: users
      })
    })
    .catch(err => {
      res.status(400).json({
        message: 'error',
        data: err
      })
    })
}

export default getAllDataUsers