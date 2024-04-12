import express from "express"
import postRoute from './routes/post.route.js'
import authRoute from './routes/auth.route.js'
const port = 3000
const app = express()

app.use('/api/posts', postRoute)
app.use('/api/auth', authRoute)


app.listen(port, () => {
    console.log("Server is running");
})


