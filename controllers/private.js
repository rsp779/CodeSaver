//const User=require("../models/User");
const Code=require("../models/Code");

exports.getPrivateData=async (req,res,next) =>{
    
    const user = req.user.id;
    try{
        const data = await Code.find({user});
        res.status(200).json({
            success : true,
            data: data
        });
    }
    catch(err){
        res.status(500).send('Server Error');
    }
}
