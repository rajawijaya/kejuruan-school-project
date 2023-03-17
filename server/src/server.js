import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRouter from "./routes/userRouter.js";

const app = express()
dotenv.config()

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@cluster0.ziztsuh.mongodb.net/kejuruan_school_database?retryWrites=true&w=majority`
const port = 3000
const host = "localhost"

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use(cookieParser())

app.use("/user", userRouter)

app.use((err, req, res, next) => {
  const status = err.errorStatus
  const message = err.message
  const data = err.data
  let dataMap = []
  
  data.map(d => {
    dataMap += {
      parameter: d.param,
      message: d.msg
    }
  })
  data.map(d => {
    console.log({parameter: d.param, message: d.msg})
  })
  
  res.status(status).json(
      {
        message,
        error: true,
        data: data.map(d => {
          return {
            parameter: d.param,
            message: d.msg
          }
        })
      }
    )
})

mongoose.connect(uri)
  .then( (res) => {
      app.listen(port, host, () => {
        console.log(`server running on http://${host}:${port}`);
      })
    }
  )
  .catch( (err) => {
      console.log(err);
    }
  )

