const mongoose=require('mongoose');

const Admin=mongoose.model('Admin',new mongoose.Schema({
    username:String,
    password:String
}));

module.exports.Admin=Admin;