# BLOG_API 
This is an RESTful API for an article Blog App

## Requirements
1. All Users should be able to register 
2. All Users should be able to login which also generates a 1hr valid token
3. All Users should be able to gain access to all the published blog Articles
4. All Users should be able to search and access an article, by using the ID of the article
5. oggedIn Users should be able to create an article
6. Only Owners of blog article can update & delete a blog post
7. Test authentication for user and article routes

### Article Routes
 - "Create a blog post"  =POST= '/api/v1/auth/articles/new'


 - "GET all published Articles" =GET= '/api/v1/auth/articles'


 - "Authors get the list of All their articles" =GET= /api/v1/auth/articles/my-articles' 

 - "GET A published Article blog by ID" =GET= '/api/v1/auth/articles/:blogID'
 

 - "Update a blog/article "  =PATCH= '/api/v1/auth/articles/:blogID'

 - "Delete A Blog/article  =DELETE= '/api/v1/auth/articles/:blogID'



#### User Routes
 - "User Register/SignUp" =POST '/api/v1/auth/register'

 - "User login" =POST=  '/api/v1/auth/login'
 
 
 ### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  first_name | string  |  true|
|  last_name  |  string |  true  |
|  email     | string  |  true |
|  password |   string |  true  |


### Article
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  title |  date |  required |
|  description | String  |  optional   |
|  author  |  String |  true 
|  state |  string |  required, default: draft, enum: ["draft", "published"] |
|read_count | Number | 
|reading_time | String



