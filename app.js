const express = require('express') //importig  express library using the 'require method'
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const httpLogger = require('./logger/httpLogger')
const app = express();

//route for register & signIn
const authUser = require('./route/auth')
//blog route config
const  articleRouter = require('./route/articlesRoute');


//Security
app.use(helmet())

//winston logger
app.use(httpLogger)

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000, // 10 minute
	max: 80, // Limit each IP to 80 requests per `window` (here, per 10 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)


//middleware to grab post/patch requests as json files or other files
app.use(express.json())
app.use(express.urlencoded({extended : true}))


//home page
app.get('/',(req, res) =>{
  res.send({
    success : true,
    message : "Welcome to AltSchool  Blog Page ",

    "Article route" :  "/api/v1/articles"
  })
})


//app middleware to the user registration & login routes
app.use('/api/v1/auth', authUser )

//app middleware to the blog article route
app.use('/api/v1/articles', articleRouter)


//handling invalid (404) routes
app.all('*',  (req, res) =>{
    res.status(404).json({ message : "This route does not exist"})
})

//error handler
app.use((error, req, res, next) =>{
    res.status(500).json({
        message : error.message
    })
})


module.exports = app;
