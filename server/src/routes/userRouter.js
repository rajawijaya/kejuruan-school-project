import express from "express";
import { body } from "express-validator";
import getAllDataUsers from "../controller/user/getAllDataUsers.js";
import addNewDataUser from "../controller/user/addNewDataUser.js";
import deleteDataUser from "../controller/user/deleteDataUser.js";
import deleteAllDataUsers from "../controller/user/deleteAllDataUsers.js";
import updateDataUser from "../controller/user/updateDataUser.js";
import validateUser from "../controller/validate/validateUser.js";

const router = express.Router()

router.get("/", getAllDataUsers)

router.post("/new", validateUser ,addNewDataUser)

router.put("/update/:id", validateUser ,updateDataUser)

router.delete("/delete/all", deleteAllDataUsers)

router.delete("/delete/:id", deleteDataUser)

export default router