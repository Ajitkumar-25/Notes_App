const jwt=require('jsonwebtoken')
const JWT_SECRET = "Ajit Kumar is a studious person";
const fetchuser=(req,resp,next)=>{
    //get the user from the jwt token and add id to req object
    const token=req.header('auth-token')
    if(!token){
        resp.status(401).send({error:"Please authenticate using a valid token"})
    }
    try{
        const data=jwt.verify(token,JWT_SECRET)
        req.user=data.user
        next()
    }
    catch(error){
        resp.status(401).send({error:"Please authenticate using a valid token"})
    }

}
module.exports=fetchuser
