import express, { json } from "express"
import cookieParser from "cookie-parser"

//import routes
import postRoute from './routes/post.route.js'
import authRoute from './routes/auth.route.js'
const port = 8080
const app = express()

// app.use("/api/test",(req,res)=>{
//     res.send("it work ok")
// })

// Middleware to parse JSON bodies
app.use(express.json())  // to send json object as post request
app.use(cookieParser())

app.use('/api/posts', postRoute)
app.use('/api/auth', authRoute)


app.listen(port, () => {
    console.log("Server is running");
})


