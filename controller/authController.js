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
        
           await user.save()
        
       res.status(201).json({
           success : true,
           message : 'Registration Completed!!!',
           user:{
               id : user._id,
               first_name : user.first_name,
               last_name : user.last_name
           }
            
       })
    } catch (error) {
       return res.status(500).send(error)
       
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
        res.status(500).json({ error })
    }
}



module.exports = {
    registerUser,
    loginUser
}