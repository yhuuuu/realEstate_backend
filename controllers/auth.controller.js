import bcrypt, { hash } from 'bcrypt'
import prisma from '../lib/prisma.js';
import jwt from "jsonwebtoken"

export const register = async (req, res) => {

    const { username, email, password } = req.body
    try {
        //HASH the Password
        const hasedPassword = await bcrypt.hash(password, 10)
        console.log(hasedPassword);
        //Create a new user and save to db
        //calling the users model
        //useing the create
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

export const login = async (req, res) => {
    //get the username and password from the body
    const { username, password } = req.body;

    try {
        //Check if the users exists- username is unique
        const user = await prisma.user.findUnique({
            where: { username } //username:username
        })

        if (!user) {
            return res.status(401).json({ message: "Invalis Credentials" })
        }


        //Check if the password is correct
        //Compare database password(bcrypt) with user input password
        //The bcrypt.compare() function internally hashes the plaintext password provided by the user using the same hashing algorithm and salt as the stored hashed password. It then compares the resulting hash with the stored hashed password.
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalis Credentials" })
        }


        // //If username and password is correct, generate cookie token and send to the user
        // res.setHeader("Set-Cookie","test=" + "myValue").json("success")
        const age = 1000 * 60 * 60 * 24 * 7

        //storage userid within token and pass it to cookie
        const token = jwt.sign(
            {
                id: user.id
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age })


        //cookie-parser library
        //if a users wants to deleted a post, can user token within cookies to check if the users is valid 
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true
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
    //db operations
}