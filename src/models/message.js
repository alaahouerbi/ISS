const mongoose=require('mongoose');

const messageSchema=mongoose.Schema({
    text:{
        type:String,
        min:1,
        max:255
    },
    sender:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    sentAt:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model("Message",messageSchema);