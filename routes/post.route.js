import express from 'express'

const router = express.Router()

router.get("/test", (req, res) => {
    res.send('hi, it works')
    console.log("get test router works!");
})
router.post("/test", (req, res) => {
    console.log("post test router works!");
})

router.put("/test", (req, res) => {
    console.log("put test router works!");
})

router.delete("/test", (req, res) => {
    console.log("delete test router works!");
})
export default router;