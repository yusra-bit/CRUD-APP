const mongoose = require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');


//------------ User Schema ------------//
const UserSchema = new mongoose.Schema({


        username:
        {
            type: String,
            required:true
        },
        email: 
        {
            type: String,
            required:true
        },
        password: 
        {
            type: String,
            required:true
        }
      });

      UserSchema.plugin(passportLocalMongoose,{usernameField:'email'});

module.exports=mongoose.model('User',UserSchema);