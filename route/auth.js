const express =require('express');
const userValidator = require('../validators/auth.validator')
const {
    registerUser,
    loginUser,
    updateUser,
    deleteUser,
    } = require('../controller/authController');

const authRoute = express.Router()

//authentication route config
const authenticateUser = require('../utils/authMiddelware')

//register a new user
//'userValidator' - from Joi package to add extra validator to user registration
// authRoute.post('/register', registerUser )
authRoute.post('/register', userValidator, registerUser )

//sign in a registered user
authRoute.post('/login', loginUser )

authRoute.patch('/update/:userID', authenticateUser, updateUser )

authRoute.delete('/delete/:userID',authenticateUser, deleteUser )








module.exports = authRoute;
