const ArticleModel = require("../models/articles");


//-----------------function to create an article on the blog site-----------------

const createArticle = async (req, res) =>{

     //grabs the user's id from the token in the JWT authorization middleware
     req.body.author = req.user.userID;


   //  creating a function to calculate the reading time
      const calcReadingTime = (text) => {
      const wordPerMinute = 200  //assumes that it takes 200 words to read/min (ref: google)
      const numOfWords = text.split(/\s/g).length //uses regex to count words by white-spaces, newlines 
      const mins = (numOfWords/ wordPerMinute) * 1
      const readTime = Math.ceil(mins) //aprox. to the next whole Number
      
      return `${readTime} minute(s) read`
     }

     
     try {

                 const newArticle = await new ArticleModel({
                 title : req.body.title,
                 description : req.body.description,
                 author : req.body.author,
                 content: req.body.content,
                 tags : req.body.tags,
                 read_count: req.body.read_count,
                 reading_time : calcReadingTime(req.body.content),
                  })

          
          
            const article = await newArticle.save()
            return res.status(201).json({status : true,  article });
          
   } catch (error) {
      res.status(500).json({status : false, message : error.message}) 
   }
  
}



//------------displaying all the published articles on the blog---------------------

const getAllArticles= async(req, res) =>{


   try {
      
         const { author, title, tags, sort } = req.query;

         const findQuery = { 
            state : "published"
             //This 'hard coded line ensures on 'published' are displayed on this route
         };
      
            //Q-14b. --searchable(filter) by the author, Blog's title & tags
         if( author ){
            findQuery.author = author
         }
         if( title ){
            findQuery.title = { $regex : title, $options : 'i' } 
            //using regex : enables us to search for titles even with the incomplete word [e.g  'ok' ==> 'look' & 'okay'];
            //adding the 'i' options : is to make our search words to be 'case Insensitive'
         }
         if( tags ){
            findQuery.tags = tags
         
         }
      
         let result =  ArticleModel.find(findQuery)
         
         // Q-14c --> ...it should be orderable .......
         if(sort){
            const sortListItems = sort.split(',').join(' ');
            result = result.sort(sortListItems) 
            //this dynamically sorts the list with different available items
         }else{
         
            result = result.sort('-read_count ,reading_time, -created_at')
            //by default, this sorts by the read_count..
            // [highest-lowest] --> reading_time[shortest - longest] --> created_at[newest - oldest]
         
         }
      
           //14a. paginate (default 20 blogs per page)
         const page = parseInt(req.query.page)  || 1
         const limit = parseInt(req.query.limit) || 20
         const skip = (page - 1) * limit  
         //this skip logic ensures that the results starts from the actual first item,
         //''' it also ensures that the next page starts from the next item and not the last item of the previous result
      
         result = result
         .skip(skip)
         .limit(limit)
         .populate({
            path : 'author',
            select :{ 
               first_name : 1,
               last_name : 2
               }
         })
      
          const article = await result
         return res.status(200).json({ status : true, article, count : article.length})
      
   } catch (error) {
    res.status(500).json({status : false, message : error.message}) 
 }
}



   //--------------displaying Onwer's Articles--------------------

      const getMyArticles = async( req, res) =>{

         //12b. Owners blogs should be paginated 
      const page = Number(req.query.page)   || 1    //page 1:default
      const limit = Number(req.query.limit) || 10    //10 per page
      const skip = (page - 1) * limit    
      try {
         const article = await ArticleModel
         .find({author : req.user.userID})
         .sort('-state')
         .skip(skip)
         .limit(limit)
   
         return res.status(200).json({status : true, article, count: article.length})
      } catch (error) {
         res.status(500).json({status : false, message : error.message})
      }
     
   }
   




//----------------search and GET an article--------------------
const getArticle = async(req, res) =>{
   const {blogID} = req.params;

    const article  = await ArticleModel.findOne({ _id : blogID})
   .populate({
      path : 'author',
      select :{ 
         first_name : 1,
         last_name : 2,
         email : 3
         }
      //Q-15a. I used populate here to generate additional information about the author
   })
  

   if(!article){
      return res.status(404).json({status : false, message: `No article with the ID: ${blogID}  found!`})
   }
   //Q-15b. increments a blog post by 1 everytime it is read/requested
   article.read_count ++
   try {
   
      await article.save()
      return res.status(200).json({success : true , article  })


    } catch (error) { 
      res.status(500).json({status : false, message : error.message})
    }
 
}


//Editing or Updating an article
const updateArticle = async(req, res) =>{
    
           //grabs the user's id from token
      req.body.author  = req.user.userID; 

      const { blogID } = req.params; 
      const { body }= req;

      if(body ===" "){
         throw new Error('fields cannot be left empty')
      }
      try {
      
         const article = await ArticleModel.findOneAndUpdate({_id: blogID, author : req.user.userID}, body,{
               new: true, 
               runValidators:true
           });  

      if(!article){
         return res.status(401).json({status : false, msg: `You're NOT authorized to Edit this article ID:${blogID}`})
      }


      res.status(200).json({success : true, article })

   } catch (error) {
      res.status(500).json({status : false, message : error.message})
   }
}


//Deleting an article
const deleteArticle = async(req, res)=>{
   
   //grabs the user's id from token
   req.body.author  = req.user.userID;
   const {blogID} = req.params;
   
try {

      const article = await ArticleModel.findOneAndRemove({_id: blogID, author: req.body.author})
      
   
      if(!article){
         return res.status(401).json({status : false, msg: `You're Unauthorized to delete this article ID:${blogID}`})
      }
      
      res.status(200).json({success : true, message :`Successful! Your Article has been Deleted!`})
   } catch (error) {
      res.status(500).json({status : false, message : error.message})

      
   }
}

module.exports={
    createArticle,
    getArticle,
    getAllArticles,
    getMyArticles,
    updateArticle,
    deleteArticle,
}