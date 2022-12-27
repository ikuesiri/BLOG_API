const express =require('express');
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
authRoute.post('/register', registerUser )

//sign in a registered user
authRoute.post('/login' , loginUser )

authRoute.patch('/update/:userID', authenticateUser, updateUser )

authRoute.delete('/delete/:userID',authenticateUser, deleteUser )








module.exports = authRoute;