import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
import User from "../../models/userModel.js";


const getDataUser = (req, res) => {
  const { userName, password } = req.body
  
  User.findOne({userName})
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          message: "error",
          error: true,
          status: 404,
          errorMsg: "User not found",
        });
      }
      
      if (password !== data.password) {
        return res.status(401).json({
          message: "error",
          error: true,
          status: 401,
          errorMsg: "Invalid password",
        });
      }
      
      const token = jwt.sign({userName, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)}, process.env.JWT_SECRET)
      res.cookie("TOKEN", token)
      res.status(200).json(
        {
          message: 'success',
          error: false,
          status: 200,
          data
        }
      )
    })
    .catch((err) => {
      res.status(500).json(
        {
          message: "error",
          error: true,
          status: 500,
          errorMsg: err
        }
      )
    })
}

export default getDataUser