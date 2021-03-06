const thread=require("../models/thread");

function threadService(){
    async function getThreads(){
        return thread.Thread.find();
    }

    async function postThread(params){
        return thread.Thread.create(params);
    }

    async function getThreadPosts(threadObjectID){
        const result=await thread.Thread.findById(threadObjectID);
        return result.posts;
    }

    async function postInThread(threadObjectID,post){
        const x=await thread.Thread.findById(threadObjectID);
        x.posts.push(post);
        x.save();
        return x;
    }
    return {
        getThreads,
        postThread,
        getThreadPosts,
        postInThread
    }

}
module.exports=threadService;
