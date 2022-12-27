const UserModel = require('../models/User');



//sign up ~ register

const registerUser = async(req, res) =>{
    const {first_name, last_name, email, password} = req.body;
    
    if(!first_name|| !last_name || !email || !password){
           
           return res.status(400).json({ message : `Please Enter all required fields`})
       }
       
    try {
       //check if the potential new User's email already exist
       const emailAlreadyExist = await UserModel.findOne({ email });
       
       if(emailAlreadyExist){
           return res.status(401).json({msg : `This email '${email}' already exist... try a different email`})
        }

       const user = new UserModel({
               first_name : first_name,
               last_name : last_name,
               email : email,
               password : password //nb: mongoose userSchema pre-hook already handled the password encryption
           })   
           const token = user.generateJWT() //called this function from the userSchma mongoose method
           await user.save()
        
       res.status(201).json({
           success : true,
           message : 'Registration Completed!!!',
           user:{
               id : user._id,
               first_name : user.first_name,
               last_name : user.last_name,
               token
           }        
       })
    } catch (error) {
       res.status(500).json({ message : error.message })
    }
}


//signin ~ login 

const loginUser = async(req, res) =>{
    try {
        const { email, password} = req.body;

        if(!email || !password){
            return res.status(400).json({ message : `Please provide your email and password`})
        }
        const user = await UserModel.findOne({ email})

        if(!user){
            return res.status(401).json({message : `Invalid Credentials`})
        }
     
        const validate = await user.isValidPassword(password);

        if(!validate){
            return res.status(401).json({message: `Incorrect password! Please try again`})
        }

        const token = user.generateJWT() //called this function from the userSchma mongoose method

        return res.status(200).json({
            success : true,
            message : 'logged in successfully',
            user : {
            id : user.id,
            token
            }
         })

    } catch (error) {
        res.status(500).json({ message : error.message })
    }
}

//function for users to edit/update their user Account

const updateUser = async(req , res) =>{
        //grabs the user's id from token
        const userID  = req.user.userID;
        const { first_name, last_name, email, password } = req.body;

        try {
            if(userID !== req.params.userID){
                return res.status(401).json({messsage : 'Unauthorized'})
             }
     
        const user = await UserModel.findOne( { _id: userID })

            if(!user ) {
                return res.status(401).json({messsage : 'Unauthorized'})
            }

                user.first_name = first_name
                user.last_name = last_name
                user.email = email
                user.password = password
                
            await user.save()
            return res.status(200).json(
                {success : true,
                 message : `Your account has been updated successfully`, 
                 user: {
                    first_name : user.first_name,
                    last_name : user.last_name,
                    userID : user._id,
                    email : user.email,
                    password : user.password
                    
                    }
                })
            
        } catch (error) {
            res.status(500).json({status : false, message : error.message})
        }

}


//Delete user account\
const deleteUser = async (req, res) => {
      //grabs the user's id from token
      const userID  = req.user.userID;

    try {
        if(userID !== req.params.userID){
            return res.status(401).json({messsage : 'Unauthorized'})
         }

        const user = await UserModel.findOne({ _id : userID})

        if(!user) {
            return res.status(401).json({messsage : 'Unauthorized'})
         }

         await user.delete()
        return res.status(200).json({ success : true, message: `Your account has been successfully deleted`})

    } catch (error) {
        res.status(500).json({status : false, message : error.message})   
    }
}

module.exports = {
    registerUser,
    loginUser,
    updateUser,
    deleteUser
}