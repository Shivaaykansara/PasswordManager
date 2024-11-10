const {Schema,model} = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
})

userSchema.pre('save',async function(next){
    const saltRound = await bcryptjs.genSalt(10);
    try {
        const hashPassword = await bcryptjs.hashSync(this.password,saltRound)
    this.password=hashPassword
    } catch (error) {
        next(error)
    }
})

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId:this._id.toString(),
            email:this.email,
            password:this.password
        },process.env.JWT_TOKEN,
        {
            expiresIn:'60d'
        })
    } catch (error) {
        console.log(error)
    }
     
}
userSchema.methods.comparePassword = async function(password){
    return bcryptjs.compare(password,this.password)
}

const UserModel = new model('users',userSchema)

module.exports = UserModel