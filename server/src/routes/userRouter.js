import express from "express";
import { body } from "express-validator";
import getAllDataUsers from "../controller/user/getAllDataUsers.js";
import addNewDataUser from "../controller/user/addNewDataUser.js";
import validateUser from "../controller/validate/validateUser.js";

const router = express.Router()

router.get("/", getAllDataUsers)

router.post("/new", validateUser ,addNewDataUser)

export default router