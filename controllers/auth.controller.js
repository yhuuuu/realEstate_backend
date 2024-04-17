import bcrypt, { hash } from 'bcrypt'
import prisma from '../lib/prisma.js';

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

export const login = (req, res) => {
    //db operations
}

export const logout = (req, res) => {
    //db operations
}