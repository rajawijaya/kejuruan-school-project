import userModel from "../../models/userModel.js";


const getAllDataUsers = (req, res) => {
  userModel.find()
    .then(users => {
      res.status(200).json({
        message: 'Success',
        error: false,
        status: 200,
        data: users
      })
    })
    .catch(err => {
      res.status(500).json({
        message: 'error',
        error: true,
        status: 500,
        errorMsg: err
      })
    })
}

export default getAllDataUsers