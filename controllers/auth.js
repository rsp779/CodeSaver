const crypto=require('crypto');
const User=require("../models/User");
const ErrorResponse =require('../utils/errorResponse');
const sendEmail=require('../utils/sendEmail');



exports.register = async(req,res,next) => {
   const {username,email,password} =req.body;

   try {
       const user=await User.create({
           username,
           email,
           password,
       });
       sendToken(user,201,res);
   
     }
      catch(error){
   next(error);
   
    }
};
exports.login = async(req,res,next) => {
    const {email,password} = req.body;




    if(!email || !password){
      return next(new ErrorResponse ("Please provide an email and Password",401))
    }

    try{
        const user=await User.findOne({email}).select("+password");

        if(!user){
            return next(new ErrorResponse ("Invalid Credentials",401))
        }
        const isMatch=await user.matchPasswords(password);

        if(!isMatch){
            return next(new ErrorResponse ("Invalid Credentials",401))
        }

        sendToken(user,200,res);

    }
    catch (error){
        res.status(500).json({success: false,error:error.message});
    }

};
exports.forgotpassword = async(req,res,next) => {
   const {email}=req.body;
  

    try {
        const user=await User.findOne({email});
        if(!user){
            return next(new ErrorResponse("Email could not be sent",404))
        }
       
        const resetToken=user.getResetPasswordToken();
       
        await user.save();
       
        const resetUrl=`https://safe-beach-63915.herokuapp.com/passwordreset/${resetToken}`;

        const message=`<h1>Password Reset !!!</h1>
        <h2>Hello ${user.username},</h2>
                <p>Greetings from CodeSaverApp. You request for resetting the password 
                is accepted. Please Click the below link to Reset Password .</p>
        <a href=${resetUrl} clicktracking=off>${resetUrl}</a>`

    //  console.log(user.email);
       
        try {
            console.log(sendEmail);
            await sendEmail ({
                to : user.email,
                subject: "Password Reset Request",
                text : message
            });
          //  console.log(user.email);
            res.status(200).json({success:true,data:"Email Sent"});
        } catch (error) {
            user.resetpasswordToken=undefined;
            user.resetpasswordExpire=undefined;

            await user.save();
            return next(new ErrorResponse("Email could not be send",500))
        }

    } catch (error) {
        next(error);
    }

};
exports.resetpassword = async(req,res,next) => {

   const resetPasswordToken=crypto.createHash("sha256").update(req.params.resetToken).digest("hex");
   console.log(`resetPasswordToken  ${resetPasswordToken}`);
   try {
       const user=await User.findOne({
           resetPasswordToken,
          resetPasswordExpire: { $gt: Date.now()}
       })
    //const user=resetPasswordToken;
      console.log(`user ${user}`);
       if(!user){
           return next(new ErrorResponse("Invalid Reset Token",400))
       }

       user.password=req.body.password;
       user.resetPasswordToken=undefined;
       user.resetpasswordExpire=undefined;

       await user.save();

       res.status(201).json({
           success: true,
           data:"Password Reset Success"
       })
   } catch (error) {
       next(error)
       
   }
};


const sendToken = (user,statusCode,res)=>{
    const token=user.getSignedToken();
    res.status(statusCode).json({success: true,token})
}