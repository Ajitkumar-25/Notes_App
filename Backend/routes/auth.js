const express=require('express')
const router=express.Router();

router.get('/',(req,resp)=>{
    const obj={
        a:"this is a",
        b:"this is b"
    }
    resp.send(obj)
})

module.exports=router;