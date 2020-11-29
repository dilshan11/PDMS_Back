const express=require('express');
const {Project}=require('../models/project');
const {User}=require('../models/users');
const {Ipa}=require('../models/ipa');
const router=express.Router();

router.post('/save',async(req,res)=>{
 
    let project=new Project({
        code:req.body.procode,
        name:req.body.proname,
        description:req.body.prodescription
    });
    
    let result=await project.save();
    
    let allusers=await User.find({viwer:true});     //get all users from DB
    for (let user of allusers){
       user.project.push(null); 
         user.save();                           // when project save add one element to array
    }
        

     result=await Project.find();
    res.send(result);

});

router.get('/getallproject',async (req,res)=>{
    let result=await Project.find();
  
    res.send(result);
})

router.post('/getviwerproject',async(req,res)=>{
    
    let user=await User.find({username:req.body.uname})
     let projectid=user[0].project;
    let records = await Project.find().where('_id').in(projectid).exec();       // get all project related to project id array
    res.send(records);
})

router.post('/update',async(req,res)=>{
    let project=await Project.find({code:req.body.precode});
    project=project[0];
    project.code=req.body.procode;
    project.name=req.body.proname;
    project.description=req.body.prodescription;
    // console.log(project);
    let pro=await project.save();
    let proarr=await Project.find();
    res.send(proarr);
})

router.post('/delete',async(req,res)=>{
    let proid=await Project.find({code:req.body.procode});
   
    proid=proid[0]._id;
    let projec=await Project.deleteOne({code:req.body.procode});
    let users=await User.find({viwer:true})

    for(let user of users){
        user.project.splice(user.project.indexOf(proid),1);
        await user.save();
    }
    await Ipa.deleteOne({project:proid});            // delete realetd ipaobject
    let result=await Project.find();
    res.send(result);
})

router.get('/summery',async(req,res)=>{                                     
    let allProject=await Project.find();                        // get all project 
    let allSummery=[];                                          // array send via http
   
    let counter=1;                                              //count for oroject number in summary table
    for (const oneProject of allProject) {                          
        let smallSummery=new Array();
        smallSummery.push(counter);                                        //no
        smallSummery.push(oneProject.name);                                //projectName
       
        let ipaTable=await Ipa.find({project:oneProject._id});            // get ipaTable related to project
        
        ipaTable=ipaTable[0];
       if(ipaTable==undefined){
            continue;
       }
          
    //    console.log( ipaTable.maximumRetention+' '+ ipaTable.total[16].value+' '+ipaTable.maximumRetention+' '+ ipaTable.advance+' '+ipaTable.total[17].value+' '+ipaTable.advance);
                console.log(ipaTable);          
       if(ipaTable.maximumRetention==null){
        smallSummery.push('');
       }else{
              smallSummery.push(Number(ipaTable.maximumRetention.replace(/,/g, '')));                       //maximumRetention
       }
       
       smallSummery.push(ipaTable.total[16].value);                                 //retention Deducted amount
     
      
        if(ipaTable.maximumRetention==null){ 
        smallSummery.push('');
      }else{
                    smallSummery.push(ipaTable.maximumRetention.replace(/,/g, '')-ipaTable.total[16].value);        //tobe deducted
      }

      if(ipaTable.advance==null){
          smallSummery.push('');
      }
      else{
        smallSummery.push(ipaTable.advance.replace(/,/g, ''));                   //advance
      }
        smallSummery.push(ipaTable.total[17].value);                                      // advance deducted amount

      
        if(ipaTable.advance==null){
            smallSummery.push('');
        }
        else{
        smallSummery.push(ipaTable.advance.replace(/,/g, '')-ipaTable.total[17].value);
        }

       allSummery.push(smallSummery);
        counter=counter+1;
       
    }
    
    res.send(allSummery);
});


router.get('/reports',async(req,res)=>{                                     
    let allProject=await Project.find();                        // get all project 
    let allSummery=[];                                          // array send via http
   
    let counter=1;                                              //count for oroject number in summary table
    for (const oneProject of allProject) {                          
        let smallSummery=new Array();
        smallSummery.push(counter);                                        //no
        smallSummery.push(oneProject.name);                                //projectName
       
        let ipaTable=await Ipa.find({project:oneProject._id});            // get ipaTable related to project
        
        ipaTable=ipaTable[0];
       if(ipaTable==undefined){
            continue;
       }
          
                          
        // smallSummery.push(Number(ipaTable.maximumRetention.replace(/,/g, '')));                       //maximumRetention
        smallSummery.push(ipaTable.total[8].value);                                 //retention Deducted amount
        // smallSummery.push(ipaTable.maximumRetention.replace(/,/g, '')-ipaTable.total[16].value);        //tobe deducted
        // smallSummery.push(ipaTable.advance.replace(/,/g, ''));                   //advance
        smallSummery.push(ipaTable.total[11].value);                                      // advance deducted amount
        smallSummery.push(ipaTable.total[8].value-ipaTable.total[11].value);

      console.log(smallSummery);

       allSummery.push(smallSummery);
        counter=counter+1;
       
        
    }
    
    res.send(allSummery);
});


module.exports=router;