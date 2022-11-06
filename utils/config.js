require('dotenv').config();

const PORT = process.env.PORT

// const MONGO_DB_URI = process.env.MONGO_DB_URI
const MONGO_DB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGO_DB_URI
    : process.env.MONGO_DB_URI

    
const JWT_SECRET = process.env.JWT_SECRET
const JWT_LIFETIME = process.env.JWT_LIFETIME


module.exports = {
    PORT,
    MONGO_DB_URI,
    JWT_SECRET,
    JWT_LIFETIME
}