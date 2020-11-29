const mongoose=require('mongoose');

const User=mongoose.model('Users',new mongoose.Schema({
    username:String,
    password:String,
    superadmin:Boolean,
    admin:Boolean,
    viwer:Boolean,
    project:Array,
    name:String,
    category:String,
    conNumber:String,
    status:String,
    permission_project:[],
    permission_projectTable:[],
    permission_charts:[],
    permission_users:[],
   

    // permission_project:{new:0,edit:0,view:0,delete:0},
    // permission_projectTable:{new:0,save:0,email:0,excel:0},
    // permission_charts:{1:0,2:0,3:0,4:0},
    // permission_users:{new:0,view:0,edit:0,delete:0,userpermission:0,projectassign:0,excel:0},

}));
module.exports.User=User;