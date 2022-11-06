
#### Article Routes
 - "Create a blog post"  =POST= [('/api/v1/auth/articles/')] 


 - "GET all published Articles" =GET= [('/api/v1/auth/articles')] 


 - "Authors get the list of All their articles" =GET= [('/api/v1/auth/articles/my-articles')] 

 - "GET A published Article blog by ID" =GET= [('/api/v1/auth/articles/:blogID')] 
 

 - "Update a blog/article "  =PATCH= [('/api/v1/auth/articles/:blogID')] 

 - "Delete A Blog/article  =DELETE= [('/api/v1/auth/articles/:blogID')] 



#### User Routes
 - "User Register/SignUp" =POST [('/api/v1/auth/register')] 

 - "User login" =POST=  [('/api/v1/auth/login')]


