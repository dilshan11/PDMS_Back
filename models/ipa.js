const mongoose=require('mongoose');

const Ipa=mongoose.model('ipa',new mongoose.Schema({
    basecontent:Array,
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },
    subtopic:Array,
    maintopic:Array,
    total:Array,
     
    ipaSubmitted:Array,
    ipcCrtfyDly:Array,
    ipcCrtfyPayDly:Array,
    pRvd:Array,
    complted:Array,

    contractName:String,
    contractNumber:String,
    startDate:String,
    finishDate:String,
    contractAmount:String,
    maximumRetention:String,
    advance:String,
    paymentStatus:String
})
);
module.exports.Ipa=Ipa;
