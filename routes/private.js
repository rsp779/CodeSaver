const express=require("express");
const router=express.Router();
//const {getPrivateData} = require("../controllers/private");
const {protect}=require("../middleware/auth");
const Code = require('../models/Code');

//router.route("/").get(protect,getPrivateData);

router.get('/',protect,async(req,res)=>{
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
})

router.post('/',protect,
async (req,res) => 
{
    const {title,url,code,difficulty,notes} = req.body;
    try{
        const newCode = new Code({user:req.user.id,title,url,code,difficulty,notes});
        await newCode.save();
        res.send('Code Added');
    }
    catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

router.delete('/:_id', protect, async (req, res) => {
    try {
      console.log(req.params);
      const codee = await Code.findById(req.params._id);
      await codee.remove();
      res.json(codee);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });


module.exports=router;
