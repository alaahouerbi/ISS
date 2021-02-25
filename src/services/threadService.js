const thread=require("../models/thread");

function threadService(){
    async function getThreads(){
        return thread.Thread.find();
    }

    async function postThread(params){
        return thread.Thread.create(params);
    }

    async function getThreadPosts(threadObjectID){
        return thread.Thread.findById(threadObjectID).posts;
    }

    async function postInThread(threadObjectID,post){
        const x=await thread.Thread.findById(threadObjectID);
        x.posts.push(post);
        x.save();
    }
    return {
        getThreads,
        postThread,
        getThreadPosts,
        postInThread
    }

}
module.exports=threadService;
