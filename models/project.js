const mongoose=require('mongoose');

const Project=mongoose.model('Projects',new mongoose.Schema({
    code:String,
    name:String,
    description:String
})
);

module.exports.Project=Project;
