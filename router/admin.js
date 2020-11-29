const express=require('express');
const {Admin}=require('../models/admin');
const router=express.Router();


router.post('/save',async(req,res)=>{
    let admin=new Admin({
        username:req.body.uname,
        password:req.body.password
    });
    let result=await admin.save();
    res.send(result);
});

router.post('/login',async(req,res)=>{
    let result=await Admin.find({username:req.body.uname,password:req.body.password});
     
    if(result.length==0) return res.send(false);
    
         res.send(result);
   
        
    
})
module.exports=router;