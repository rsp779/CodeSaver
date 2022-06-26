const express=require('express');
const router=express.Router();

const {register,login,forgotpassword,resetpassword} =require('../controllers/auth');

router.route("/register").post(register);

router.route("/login").post(login);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:resetToken").put(resetpassword);
module.exports=router;


// here the various types of method are specified to various routes 
// that is register,login and forgotpassword would be post request and reset password will be put request.
