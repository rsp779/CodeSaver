const jwt=require('jsonwebtoken');
const User=require('../models/User');
const ErrorResponse=require('../utils/errorResponse');
const config=require('config');

exports.protect=async(req,res,next) => {
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
       //Bearer 
        token=req.headers.authorization.split(" ")[1]
    }
   // console.log(`token ${token}`);
    if(!token){
        return next(new ErrorResponse("Not authorized to acces this route",401));
    }
    
    try {
        const decode=jwt.verify(token,config.get('JWT_SECRET'));
        const user=await User.findById(decode.id);

        if(!user){
            return next(new ErrorResponse("No user found with id",404));
        }
        req.user=user;
        next();
    } catch (error) {
       // console.log("midddleware error");
        return next(new ErrorResponse("Not authorized to access this route",401));
    }
}