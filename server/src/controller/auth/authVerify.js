import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
import User from "../../models/userModel.js";

const authVerify = (req, res, next) => {
  const cookie = req.cookies.TOKEN
  const { userName, password } = req.body
  
  if (userName && !password) {
    res.status(401).json(
      {
        message: 'error',
        error: true,
        status: 401,
        errorMsg: 'Password is required'
      }
    )
  }
  
  if (!userName && password) {
    res.status(401).json(
      {
        message: 'error',
        error: true,
        status: 401,
        errorMsg: 'Username is required'
      }
    )
  }
  
  if (!userName && !password && !cookie) {
    res.status(401).json(
      {
        message: 'error',
        error: true,
        status: 401,
        errorMsg: 'Authentication is required'
      }
    )
  }
  
  if (cookie) {
    jwt.verify(cookie, process.env.JWT_SECRET, (err, decode) => {
      if (decode) {
        User.findOne({userName: decode.userName})
          .then((data) => {
            res.json(
              {
                message: 'success',
                error: false,
                status: 200,
                data
              }
            )
          })
          .catch((err) => {
            res.status(404).json(
              {
                message: 'error',
                error: true,
                status: 500,
                errorMsg: err
              }
            )
          })
      } else if (err) {
          res.status(401).json(
            {
              message: 'error',
              error: true,
              status: 401,
              errorMsg: err
            }
          )
      }
    })
  }
  
  if (userName && password) {
   next()
  }
}

export default authVerify