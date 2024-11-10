const {Schema,model} = require('mongoose')

const passwordSchema = new Schema({
    userId:{
        type:String,
        require:true
    },
    site:{
        type:String,
        require:true,
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})

const PasswordModel = new model('passwords',passwordSchema)

module.exports = PasswordModel