const mongoose = require('mongoose'); // include monogoose
const userSchema = new mongoose.Schema({ // create user schema
 
    username:{
        type:String,
        required:true,
        unique:true 
    }, // to create username field
    age:{
        type:Number,
        required:true
    },// to create age field

    password:{
        type:String,
        required:true
    }// to create password field

}, { 
    timestamps: true 
}); // automatically add createdAt and updatedAt fields


const User = mongoose.model('User', userSchema);


module.exports = User;
