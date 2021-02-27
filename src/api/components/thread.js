const Router=require('express').Router;
const verifyToken=require('../middleware/authJwt');
const router=Router({mergeParams:true});
const threadService=require('../../services/threadService')();

router.get('/getThreads',async(req,res)=>{
    const  threads= await threadService.getThreads();
    res.send(threads);
})
router.get('/getThreadPosts/:ThreadId',async(req,res)=>{
    const posts=await threadService.getThreadPosts(req.params.ThreadId);
    res.send(posts);
})
router.post('/addThread',verifyToken,async(req,res)=>{
    const result=await threadService.postThread({title:req.body.title});
    res.send(result);
})
router.post('/postInThread/:ThreadId',verifyToken,async(req,res)=>{
    req.body.poster=req.decodedToken.userId;
    const result =await threadService.postInThread(req.params.ThreadId,req.body);
    res.send(result);
})

module.exports=router;