const mongoose=require('mongoose');

const userSchema= mongoose.Schema({
    firstName: {
        type: String,
        lowercase: true,
        min: 2,
        max: 255
      },
      lastName: {
        type: String,
        lowercase: true,
        min: 2,
        max: 255
      },
      email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        min: 6,
        max: 255
      },
      password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
      },
        registeredOn: {
        type: Date,
        default: Date.now
      },
      username:{
          type:String,
          min:2,
          max:255
      }
})
module.exports = mongoose.model("User", userSchema);