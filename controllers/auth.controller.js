import bcrypt from 'bcrypt'

export const register = async(req, res) => {

    const { username, email, password } = req.body

    //HASH the Password
    const hasedPassword = await bcrypt.hash(password,10)
    console.log(hasedPassword);
    res.sendStatus(200)
}

export const login = (req, res) => {
    //db operations
}

export const logout = (req, res) => {
    //db operations
}