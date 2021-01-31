const Router=require('express').Router;
const messageService=require('../../services/messageService')();
const verifyToken=require('../middleware/authJwt');
const router=Router({mergeParams:true});

router.post('/addMessage',verifyToken,async(req,res)=>{
    const message=await messageService.addMessage({text:req.body.text,sender:req.decodedToken._id});
    res.send(message);
})
router.get('/getMessages',async(req,res)=>{
    const messages=await messageService.getLatestMessages();
    res.send(messages);
})

module.exports=router;