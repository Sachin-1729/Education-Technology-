const mongoose = require('mongoose');
const Role = require('./Rolemodel'); // Import the Role model
const validator = require('validator'); // Make sure to install this package


const userSchema = new mongoose.Schema({
    name: {
        type: String,
       
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required'],
        validate: {
          validator: (value) => validator.isEmail(value), // Using validator for email validation
          message: 'Invalid email format'
        }
      },
      password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters'],
        maxlength: [12, 'Password cannot be more than 12 characters']
      }
    ,
    token:{
      
       type: String,
       required: false,
    },
    Role:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: false,
    },
   
   

} , { timestamps: true });

const User = mongoose.model('User', userSchema , "users");
module.exports = User