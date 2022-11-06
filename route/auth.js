const express =require('express');
const {
    registerUser, 
    loginUser
    } = require('../controller/authController');



const authRoute = express.Router()
//register a new user
authRoute.post('/register', registerUser )

//sign in a registered user
authRoute.post('/login' , loginUser )



module.exports = authRoute;