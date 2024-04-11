import express from "express"

const router = express.Router();

//all post request because we are going to get information to the user and save it to the database
router.post("/register", (req, res) => {
    console.log('router works');
})

router.post("/login", (req, res) => {
    console.log('router works');
})

router.post("/logout", (req, res) => {
    console.log('router works');
})

export default router;