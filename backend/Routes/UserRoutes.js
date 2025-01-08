const express=require('express')
const {registerUser,loginUser, updateUser }=require('../Controllers/UserController')
const router=express.Router()

router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/update-user/:id', updateUser);



module.exports=router;