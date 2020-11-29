const express=require('express');
const {User}=require('../models/users');
const {Project}=require('../models/project');
const router=express.Router();

router.post('/save',async(req,res)=>{
    let user=new User({
        username:req.body.add_uname,
        password:req.body.add_password,
        superadmin:req.body.superadmin,
        admin:req.body.admin,
        viwer:req.body.viwer,
        project:req.body.project,
        name:req.body.add_name,
        category:req.body.add_category,
        conNumber:req.body.add_conNumber,
        status:req.body.add_status,
        permission_project:req.body.permission_project,
        permission_projectTable:req.body.permission_projectTable,
        permission_charts:req.body.permission_charts,
        permission_users:req.body.permission_users,

    });
    try{
    let message=await User.find({username:req.body.add_uname});
    if(message.length>0){return res.send({"message":"user name already exist"})}
    let result=await user.save();
    result=await User.find();
    res.send(result);

    }catch(e){
         
        res.send ({"message":"try again"});
    }
});

router.post('/updateUser',async(req,res)=>{

    let user=await User.find({_id:req.body._id});
    user=user[0];
   
        let userName=user.username;
    console.log(userName);
        user.username=req.body.add_uname;
        user.password=req.body.add_password;
        user.name=req.body.add_name;
        user.category=req.body.add_category;
        user.conNumber=req.body.add_conNumber;
        user.status=req.body.add_status;
        let message;

    if(userName!=req.body.add_uname){
       
        message=await User.find({username:req.body.add_uname});
       
        if(message.length>0){return res.send({"message":"user name already exist"})} 
    }
    
    let result=await user.save();
    result=await User.find({viwer:true});
    res.send(result);
    
});

router.post('/login',async(req,res)=>{
    let result=await User.find({username:req.body.uname,password:req.body.password});
    console.log( result.length +"login");
    if(result.length==0) return res.send(false);
    if(result[0].status.toLowerCase()=="active"){
       /// return res.send(false);
       return res.send(result);
    }else{
        return res.send(false);
    }
         
});

router.post('/passwordchange',async(req,res)=>{
    let result=await User.find({username:req.body.uname,password:req.body.oldpassword});
    if(result.length==0) return res.send(false);
    result=result[0];
    result.password=req.body.newpassword;
     result=await result.save()
   res.send(result);
})

router.get('/getallviwers',async(req,res)=>{
    let result=await User.find({viwer:true});
    res.send(result);
});

router.get('/getallViwersForProjectAssign',async(req,res)=>{
    let result=await User.find({viwer:true});
    res.send(result);
});

router.post('/delete',async(req,res)=>{
  let result= await User.deleteOne({username:req.body.username})

  result=await User.find();
  res.send(result);
})

router.post('/update',async(req,res)=>{
   
   
    let user=await User.findById(req.body.rid);
   // user.project[Number(req.body.cid)]=req.body.p_id;
     user.project.set(Number(req.body.cid),req.body.p_id);
   let result=await user.save();
   
   let a=await User.find({viwer:true});
    res.send(a);

    
});

router.post('/update_userPermission',async(req,res)=>{
    let user=await User.findById(req.body._id);
    
   
    user[req.body.objectName].set(req.body.arrayPlace,req.body.value);
    // user.permission_project=req.body.permission_project;                             // this methode update single user all access permission
    // user.permission_projectTable=req.body.permission_projectTable;
    // user.permission_users=req.body.permission_users;
    // user.permission_charts=req.body.permission_charts;
     let result =await user.save();
     console.log(result);
    res.send(result);
})



router.get('/getProject/:name',async(req,res)=>{
   
   if(req.params.name=="admin"){                             // get all project for admin
     let result=await Project.find();
        res.send(result);
   }else{                                            // 
       let result=(await User.find({username:req.params.name}))[0];
       let proid_arr=result.project;
      
       let oneprojectarr=[];
       for(let oneproid of proid_arr){
           if(oneproid != null){
              oneprojectarr.push(await Project.findById(oneproid));
           }
       }
        res.send(oneprojectarr);
       
   }
    
});

module.exports=router;