import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRouter.js";

const app = express()
dotenv.config()

const port = 5000
const host = "127.0.0.1"

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(cookieParser())

app.use("/user", userRouter)

app.use((err, req, res, next) => {
  const status = err.errorStatus
  const message = err.message
  const data = err.data
  
  res.status(status).json(
      {
        message,
        error: true,
        status,
        data: data.map(d => {
          return {
            parameter: d.param,
            message: d.msg
          }
        })
      }
    )
})

mongoose.connect(process.env.MONGODB_URI)
  .then( (res) => {
      app.listen(port, () => {
        console.log(`server running on http://${host}:${port}`);
      })
    }
  )
  .catch( (err) => {
      console.log(err)
    }
  )

