const express=require('express')
const router=express.Router();

router.get('/',(req,resp)=>{
    
    resp.send("hello")
})

module.exports=router;