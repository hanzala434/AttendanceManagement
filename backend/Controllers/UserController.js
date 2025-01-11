const User=require('../Models/User')
const {hashPassword,comparePassword}=require('../Helper/AuthHelper')
const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')

const registerUser= asyncHandler(async (req,res)=>{
        const {name,email,password,address,phone,role,image}=req.body
    
        if(!name || !email || !password ||!address||!phone){
            res.status(400)
            throw new Error('Please add all fields')
        }
    
        //check if user exist
        const userExist=await User.findOne({email})
    
        if(userExist){
            res.status(400)
            throw new Error('User already exist')
        }

        //register new user
        const hashedPassword=await hashPassword(password)
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            address,
            phone,
            role,
            image
        })
    
        if(user){
            res.status(201).json(
            {_id:user.id,
            name:user.name,
            email:user.email,
            token:generateToken(user.id),
            phone:user.phone,
            role:user.role,
            image:user.image,
        })
        }else{
            res.status(400)
                throw new Error('Invalid user data')
            
        }
    
})

const loginUser=asyncHandler(async (req,res)=>{

    const {email,password,role}=req.body
    const user=await User.findOne({email})

    if(user &&(await comparePassword(password,user.password))){
        if (role !== user.role) {
            res.status(403);
            throw new Error('Role mismatch');
        }
        res.status(201).json(
            {_id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
            token:generateToken(user.id,role),
            phone:user.phone,
            image:user.image
        })
    }else{
        res.status(400)
        throw new Error('Invalid credentials')
    }


})

//jwt token generation
const generateToken=(id,role)=>{
    return jwt.sign({id,role},process.env.JWT_SECRET,
        {expiresIn:'30d'})
    
}   


  const updateUser = asyncHandler(async (req, res) => {
    const { name, email, password, address, phone, image } = req.body;
  
    const user = await User.findById(req.params.id);
  
    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
  
    if (password) {
      user.password = await hashPassword(password);
    }
  
    user.name = name || user.name;
    user.email = email || user.email;
    user.address = address || user.address;
    user.phone = phone || user.phone;
    user.image = image || user.image;
    user.password = password || user.password;




  
    const updatedUser = await user.save();
  
    res.status(200).json({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      phone: updatedUser.phone,
      role: updatedUser.role,
      image: updatedUser.image,

    });
  });

module.exports={
    registerUser,
    loginUser,
    updateUser

}