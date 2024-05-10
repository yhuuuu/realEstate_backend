/**
 * Authentication API requests
*/
import express from "express"

//authentication functions
import { login, logout, register } from "../controllers/auth.controller.js";

const router = express.Router();

/***
 * All request are "POST" because we are going to get *information from the user and save it to the database
 *
 * Using authentication function can simplier the code
 * router.post("/register",(req, res)=>{ console.log
 * ("router works!"); })
*/

router.post("/register", register)
router.post("/login", login) //get the users info and check the user in database
router.post("/logout",logout )

export default router;