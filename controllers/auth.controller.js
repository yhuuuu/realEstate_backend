/**
 * Authentication function for auth routes
 */
import bcrypt, { hash } from 'bcrypt'
import prisma from '../lib/prisma.js';
import jwt from "jsonwebtoken"

/**
 * 
 * Register
 */
export const register = async (req, res) => {
    /**
     * We are using body to make the request
     * if console.log(req.body) --> undefined  
     * because it needs include "app.use(express.json())" in order to send json object
     */
    const { username, email, password } = req.body  //deconstruct the body

    try {
        /**
         * --- HASH THE PASSWORD ---
         * To make the password not visible in db
         * And using brypt to hash pd from the user
         * The hash function is a async function
         * Install and impost prisma package to save the body req in the MongoDB
         * npx prisma init --data source-provider mongodb
         */
        const hasedPassword = await bcrypt.hash(password, 10)
        console.log(hasedPassword);

        /**
         * --- CREATE A NEW USER AND SAVE TO DB ---
         * Install and import bcrypt package
         * Calling the user model
         * 
         */
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hasedPassword,

            }
        })
        console.log(newUser);

        res.status(201).json({ message: "User created successfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create user!" })
    }
}

/**
 * 
 *  Login
 */
export const login = async (req, res) => {


    //Getthe username and password from the body
    const { username, password } = req.body;

    try {
        //Check if the users exists- username should be unique
        const user = await prisma.user.findUnique({
            where: { username } //username:username
        })

        if (!user) {
            return res.status(401).json({ message: "Invalis Credentials" })
        }


        /**
         * Check if the password is correct
         * Compare database password(bcrypt) with user input password
         * The bcrypt.compare() function internally hashes the plaintext password
         * provided by the user using the same hashing algorithm and salt as the 
         * stored hashed password. It then compares the resulting hash with the
         * stored hashed password
         */
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalis Credentials" })
        }


        //If username and password is correct, generate cookie token and send to the user
        // res.setHeader("Set-Cookie","test=" + "myValue").json("success")
        
        const age = 1000 * 60 * 60 * 24 * 7
        //storage userid within token and pass it to cookie
        const token = jwt.sign( //sign function to pass in user information
            {
                id: user.id
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age }
        );

        //Install cookie-parser package
        //If a users wants to deleted a post, can user token within cookies to check if the users is valid 
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true //prodution mode must be true
            maxAge: age,

        })
            .status(200)
            .json({ message: "Login Successful" })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to login!" })
    }
}

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout Successfully!" })
}