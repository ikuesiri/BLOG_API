const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('./config')


const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader  ||  ! authHeader.startsWith('Bearer ')){
        throw new Error('Invalid Authentication')
    }
 
    
    
    const token = authHeader.split(" ")[1];
    // console.log(token)
    
    try {
        const payload = jwt.verify(token, JWT_SECRET)
        
        //useful when attaching the user[author] to the protected articles route
        req.user = {userID : payload.userID, email : payload.email, first_name : payload.first_name, last_name : payload.last_name}
        next()

    } catch (error) {
        throw new Error('Invalid Authentication')
        
    }
}


module.exports = authenticate

