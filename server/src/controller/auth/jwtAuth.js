import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config()
import User from "../../models/userModel.js";

const jwtAuth = (req, res) => {
  const cookie = req.cookies.TOKEN

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
    return;
  }

  res.status(404).json(
    {
      message: "Token not found",
      error: true,
      status: 404
    }
  )
  
}

export default jwtAuth