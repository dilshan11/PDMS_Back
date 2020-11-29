const express=require('express');
const app=express();
const mongoose=require('mongoose');
const project=require('./router/Projects');
const Doc=require('./router/document');
const Admin=require('./router/admin');
const User=require('./router/user');
const Ipa=require('./router/ipa');

 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(express.json());
 
  mongoose.connect('mongodb+srv://dilshan11:nanayakkara@chatapp-ukl5u.mongodb.net/test?retryWrites=true&w=majority')
  .then(()=>console.log('connected to mongoDB...'))
  .catch(err=>console.log());

  app.get('/',(req,res)=>{
       console.log(req.body);
      res.send('hello world');
  });

   


  app.use('/api/project',project);
  app.use('/api/doc',Doc);
  app.use('/api/admin',Admin);
  app.use('/api/user',User);
  app.use('/api/ipa',Ipa);

 
  const port=process.env.PORT || 3000;
  app.listen(port,()=>{
      console.log('Listing');
  });
