const mongoose = require('mongoose')
const URI =process.env.MONGO_URI
const connectDB = async()=>{
    try {
        await mongoose.connect(URI)
        console.log("Connection established successfully")
    } catch (error) {
        console.log("Can't connect to DB")
        process.exit(0)
    }
}

module.exports = connectDB