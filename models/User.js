const crypto=require('crypto');
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const config=require('config');

const UserSchema = new mongoose.Schema({
    username : {
        type : String,
        required: [true,"Please provide a username"],
    },
    email :{
         type : String,
         required: [true,"Please provide a email"],
         unique: true,
         match: [
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            "Please provide a valid email"
         ],
    },
    password: {
        type: String,
        required: [true,"Please add a password"],
        minlength: 6,
        select : false
    },
    resetPasswordToken : String,
    resetPasswordExpire : Date
});

UserSchema.pre("save",async function(next){

    if(!this.isModified("password")){
    next();
    }
const salt=await bcrypt.genSalt(10);
this.password=await bcrypt.hash(this.password,salt);
next();
});

UserSchema.methods.matchPasswords=async function(password){
    return await bcrypt.compare(password,this.password);
};

UserSchema.methods.getSignedToken=function(){
return jwt.sign({id:this._id},config.get('JWT_SECRET'),{
    expiresIn: config.get('JWT_EXPIRE'),
});
};

UserSchema.methods.getResetPasswordToken = function() {

const resetToken=crypto.randomBytes(20).toString("hex");



this.resetPasswordToken = crypto
.createHash("sha256")
.update(resetToken)
.digest("hex");
this.resetPasswordExpire=Date.now() + 10*(60*1000);




return resetToken;
}

const User=mongoose.model("User",UserSchema);

module.exports=User;

// Here we created user schema that has username , email which has to be unique and valid, password which is required and has to have minimum length
// then we created user model which is like a collection of schema 
// we check whether or not the password is already present or not and then 
//we hash the password using the bcrypt module and salt
// Now we create jason web token that helps in authentication and autherization.
// this takes some string ,payload and signature 
