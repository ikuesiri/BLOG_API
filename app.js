const express = require('express') //importig  express library using the 'require method'

const app = express();


//route for register & signIn
const authUser = require('./route/auth')
//blog route config
const  articleRouter = require('./route/articlesRoute');



//middleware to grab post/patch requests as json files or other files
app.use(express.json())
app.use(express.urlencoded({extended : true}))



//app middleware to the user registration & login routes
app.use('/api/v1/auth', authUser )

//home page
app.get('/',(req, res) =>{
    res.json({success : true, message : `Welcome to AltSchool  Blog Page`})
})

//app middleware to the blog route
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