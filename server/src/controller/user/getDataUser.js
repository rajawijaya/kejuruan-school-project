import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt"
dotenv.config()
import User from "../../models/userModel.js";


const getDataUser = (req, res) => {
  const { userName, password } = req.body

  if (!userName || !password) {
    return res.status(401).json({
      message: "Username and password requirement!",
      error: true,
      status: 401,
    });
  }
  
  User.findOne({userName})
    .then( async (data) => {
      if (!data) {
        return res.status(404).json({
          message: "User not found",
          error: true,
          status: 404,
        });
      }

      const comparePass = await bcrypt.compare(password, data.password)

      if (!comparePass) {
        return res.status(401).json({
          message: "Invalid password",
          error: true,
          status: 401,
        });
      }
 
      const token = jwt.sign({userName, exp: Math.floor(Date.now() / 1000) + (60)}, process.env.JWT_SECRET)
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