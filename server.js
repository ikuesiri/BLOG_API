
const app = require('./app')
//importing the mongoDB dataBase configuration file
const connectDB = require('./database/connectDB')
//winston logger
const logger = require('./logger/logger')

require("dotenv").config(); // to be able to import hidden configurations
const { PORT, MONGO_DB_URI } = require('./utils/config')





//setting up the Database and server connections
const start = async() =>{
    try {

         await connectDB(MONGO_DB_URI)
        app.listen( PORT, () => {logger.info(`Server listening at Port: ${PORT}`)})
        //this ensures that the database is connected before the server starts listening

    } catch (error) {
        logger.error('Unable to connect to the Database ' + error)
    }
}

//starts the connections
start();
