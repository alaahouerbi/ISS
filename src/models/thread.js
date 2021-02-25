const mongoose=require('mongoose');
const postSchema=mongoose.Schema({
    text:String,
    postedOn:Date,
    poster:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"User"
    }
});
const threadSchema= mongoose.Schema({
    title:String,
    posts:[postSchema]

    
});
module.exports={
    Thread:mongoose.model("Thread",threadSchema),
    Post:mongoose.model("Post",postSchema)
};