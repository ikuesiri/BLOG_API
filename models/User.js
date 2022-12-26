const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { JWT_SECRET, JWT_LIFETIME } = require('../utils/config')

const Schema = mongoose.Schema;


const UserSchema = new Schema({
   first_name : {
      type : String,
      required : [true, "Please provide your first name"],
      maxlength : [30, " first_name is too long"],
      minlength : [2, " first_name is too short"],
      lowercase : true //converts input to lowercase before saving to the database, following best practice as explained in the LMS 
   },

   last_name : {
      type : String,
      required : [true, "Please provide your last name"],
      maxlength : [30, "last_name is too long"],
      minlength : [2, " last_name is too short"],
      lowercase : true
   },
   email : {
      type : String,
      unique: [true, `email address Already taken, please try another`],
      required : [true, "Please provide your email"],
      match: [
         /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         'Please provide a valid email'
       ],
      lowercase : true
   },
   password : {
      type : String,
      required : [true, "Please provide your password"],
      minlength: [6, 'Password is too short']
   }

});


//pre-hook function to automatically hash users password before its saved to the database
UserSchema.pre('save', async function(next) {

   const salt = await bcrypt.genSalt(10);
   const hashpassed = await bcrypt.hash(this.password, salt);

   this.password = hashpassed;
   next()
})


//mongoose schema method to generate a token when a user  registers or logs in successfully
UserSchema.methods.generateJWT = function () {
   return jwt.sign({userID : this._id, email : this.email, first_name : this.first_name, last_name : this.last_name },
      JWT_SECRET,
      { 
         expiresIn : JWT_LIFETIME || '1h' 
      }
      );
}

//this method  when called,it  ensures that  users trying to login, enter their correct passowrd,...
//...so this function is necessary since the password in the database in encrypted
UserSchema.methods.isValidPassword = async function(password ){
   const compare = await bcrypt.compare(password, this.password);
   return compare
}



const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;