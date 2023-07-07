const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    mobileNo: {
        type: String,
        require: true
    },
    isVerified: {
        type: Boolean
    }
})

const  UserModel=mongoose.model('users', UserSchema)
module.exports=UserModel