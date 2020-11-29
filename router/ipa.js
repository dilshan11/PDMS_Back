const express=require('express');
const {Ipa}=require('../models/ipa');
const router=express.Router();
var schedule = require('node-schedule');

router.get('/getbarchart/:name',async(req,res)=>{
  console.log(req.params.name);
 let ipa=(await Ipa.find({project:req.params.name}).select({basecontent:1}))[0];
 let barchartdata=[];
for(let row of ipa.basecontent){
 barchartdata.push({ipa_no:row[0].value,ctydly:row[12].value,paydly:row[13].value,startDate:row[4].value});
 console.log(row);
}

  res.send(barchartdata);
});

router.post('/save',async(req,res)=>{
  
      
    let onedoc=await Ipa.find({project:req.body.project});
    if(onedoc.length==0){
         let ipa=new Ipa({
        basecontent:req.body.base,
        project:req.body.project,
        subtopic:req.body.subtopic,
        maintopic:req.body.maintopic,
       total:req.body.total,

        ipaSubmitted:req.body.ipaSubmitted,
        ipcCrtfyDly:req.body.ipcCrtfyDly,
        ipcCrtfyPayDly:req.body.ipcCrtfyPayDly,
        pRvd:req.body.pRvd,
        complted:req.body.complted,

        contractName:req.body.projectDetails.contractName,
        contractNumber:req.body.projectDetails.contractNumber,
        startDate:req.body.projectDetails.startDate,
        finishDate:req.body.projectDetails.finishDate,
        contractAmount:req.body.projectDetails.contractAmount,
        maximumRetention:req.body.projectDetails.maximumRetention,
        advance:req.body.projectDetails.advance,
        paymentStatus:req.body.projectDetails.paymentStatus
    });
    
      let result= await ipa.save();
      result=await Ipa.find({project:req.body.project})
      res.send(result[0]);
      return
    }
     
    onedoc=onedoc[0];
    onedoc.basecontent=req.body.base;
    onedoc.subtopic=req.body.subtopic;
    onedoc.maintopic=req.body.maintopic;
    onedoc.total=req.body.total;

    onedoc.ipaSubmitted=req.body.ipaSubmitted,
    onedoc.ipcCrtfyDly=req.body.ipcCrtfyDly,
    onedoc.ipcCrtfyPayDly=req.body.ipcCrtfyPayDly,
    onedoc.pRvd=req.body.pRvd,
    onedoc.complted=req.body.complted,
       
        onedoc.contractName=req.body.projectDetails.contractName,
        onedoc.contractNumber=req.body.projectDetails.contractNumber,
        onedoc.startDate=req.body.projectDetails.startDate,
        onedoc.finishDate=req.body.projectDetails.finishDate,
        onedoc.contractAmount=req.body.projectDetails.contractAmount,
        onedoc.maximumRetention=req.body.projectDetails.maximumRetention,
        onedoc.advance=req.body.projectDetails.advance,
        onedoc.paymentStatus=req.body.projectDetails.paymentStatus

    let result=await onedoc.save();
    result=await Ipa.find({project:req.body.project})
    res.send(result[0]);
   
});


router.post('/getall',async(req,res)=>{
  console.log(req.body.project);
   
     let result=await Ipa.find({project:req.body.project});
    console.log(result);
     result=result[0];
    
     res.send(result);
});

// var j = schedule.scheduleJob('* * 23 * * *',async function(){

var j = schedule.scheduleJob('* * 23 * * *',async function(){
  console.log("working");
  let object_idcollection=await Ipa.find().select({_id:1});
  for(let object_id of object_idcollection){
    let onedoc=await Ipa.findById(object_id);
   
    let basecontent=onedoc.basecontent;

    // if(basecontent === undefined){
    //   continue;
    // }
    // console.log(basecontent== undefined);
    for(let onerow of basecontent){
         if(onerow[6].value!=''){
       // console.log(onerow[6].value+"=>"+get_datediff_tilltoday(onerow[6].value));
         
          
        onerow[12].value=get_datediff_tilltoday(onerow[6].value);
        onerow[13].value=get_datediff_tilltoday(onerow[9].value);

        console.log(onerow[6].value+"=="+onerow[12].value+" and "+onerow[9].value+"==" +onerow[13].value);
          // console.log(new Date());
         

         }
        basecontent.set()
    }
    onedoc.markModified('basecontent');
   await  onedoc.save();

  }

});

function get_datediff_tilltoday(rdate){
    let mydate =new Date(convertdate_to_rightformat(rdate));
    let today=new Date();
    let difftime=(today.getTime()-mydate.getTime())/(1000*3600*24);
    let diffdays=difftime-difftime%1;
    return diffdays;
  }

function convertdate_to_rightformat(rdate){
  let count=0;
  let countarr=[];
  let tc=0;
  for(let a of rdate){
    count=count+1;
    if(a=='/'){
      countarr[tc]=count;
      tc=tc+1;
    }  
  }
  let date=rdate.substring(0,countarr[0]-1);
  let month=rdate.substring(countarr[0],countarr[1]-1);
  let year=rdate.substring(countarr[1],rdate.length);
  return year+'/'+month+'/'+date;
}


module.exports=router;