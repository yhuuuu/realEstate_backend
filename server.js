import express, { json } from "express"
import cookieParser from "cookie-parser"
import postRoute from './routes/post.route.js'
import authRoute from './routes/auth.route.js'
const port = 3000
const app = express()

// Middleware to parse JSON bodies
app.use(express.json())
app.use(cookieParser())

app.use('/api/posts', postRoute)
app.use('/api/auth', authRoute)


app.listen(port, () => {
    console.log("Server is running");
})


