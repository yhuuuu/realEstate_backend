import express from "express"
import { login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router();

//all post request because we are going to get information to the user and save it to the database
router.post("/register", register)

//get the users info and check the user in database
router.post("/login", login)

router.post("/logout",logout )

export default router;