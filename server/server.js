require('dotenv').config()
const express = require('express')
const app = express()
const connectDB = require('./utils/db')
const authRouter = require('./routers/auth-router')
const passRouter = require('./routers/pass-router')
const cors = require('cors')

const corsOption = {
    origin:'https://passwordmanager-frontend-0rjt.onrender.com',
    method:'GET,PUT,POST,PATCH,DELETE,HEAD',
    credentials:true
}

app.use(cors(corsOption))
app.use(express.json())
app.use('/api/auth',authRouter)
app.use('/api/manager',passRouter)

const port = process.env.PORT || 5000
connectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`Listening on Port ${port}`)
    })
    
})
