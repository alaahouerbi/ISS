const Router = require('express').Router;
const userSerive=require("../../services/userService")();

const router = Router({
    mergeParams: true
  });

router.post('/register', async (req, res, next) => {
    const user=await userSerive.register(req.body);
    res.send(user);

});
router.post('/login',async(req,res,next)=>{
  const user=await userSerive.login(req.body);
 
  res.send(user);
})
module.exports=router;