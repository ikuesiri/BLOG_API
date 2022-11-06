const express =require('express');

//authentication route config
const authenticateUser = require('../utils/authMiddelware')
//calling the router function
const router = express.Router()

//importing the CRUD  functions from the controller folder
const {

    createArticle, 
    getMyArticles, 
    getAllArticles,
    getArticle, 
    updateArticle, 
    deleteArticle

}  =require('../controller/articles')









//7. Logged in users should be able to create a blog.[therefore authentication/authorization is needed in this route]
//create a new blog post
router.post('/new', authenticateUser, createArticle)                                       


//5. Logged in and not logged in users should be able to get a list of all published blogs created [...therefore No auth needed]
//get all the published aritcles
router.get('/', getAllArticles);

//Requires authentication to enable the Owner get a list of their articles
router.get('/my-articles', authenticateUser, getMyArticles)

//get a published aritcle id : {blogID}
//6. Logged in and not logged in users should be able to get a published blog [...therefore No auth needed]
router.get('/:blogID', getArticle);

//Edit/Updating an article 
router.patch('/:blogID', authenticateUser, updateArticle)

//delete an article
router.delete('/:blogID', authenticateUser, deleteArticle)




module.exports = router;


