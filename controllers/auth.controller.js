import bcrypt, { hash } from 'bcrypt'
import prisma from '../lib/prisma.js';

export const register = async (req, res) => {

    const { username, email, password } = req.body

    //HASH the Password
    const hasedPassword = await bcrypt.hash(password, 10)
    console.log(hasedPassword);
    res.sendStatus(200)

    //Create a new user and save to db
    //calling the users model
    //useing the create
    const newUser = await prisma.user.create({
        data:{
            username,
            email,
            password:hasedPassword,
        }
    })
    console.log(newUser);
}

export const login = (req, res) => {
    //db operations
}

export const logout = (req, res) => {
    //db operations
}