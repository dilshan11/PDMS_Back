const express=require('express');
const {Doc}=require('../models/document');
const router=express.Router();

router.post('/save',async(req,res)=>{
    let doc=new Doc({
        arripa:req.body.arr
    });
    let result=await doc.save();
    res.send(result);
});
module.exports=router;