const jwt  = require("jsonwebtoken")
require("dotenv").config()
exports.auth = async(req,res,next)=>{
    const token = req.cookies.token || req.body.token || 
                    req.header("Authorization").replace("Bearer ","");
    if(!token){
        console.log("token missing")
        return res.status(400).json({
            success:false,
            message:"Token is missing"
        })
    }
    try{
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decode;
        next();
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"token is invalid",
        })
    }
     
}

exports.isStudent = async(req,res,next)=>{
    try{
        const accountType = req.user.accountType;
        console.log("inside is student",accountType)

        if(accountType!=="Student"){
            return res.status(401).json({
                success:false,
                message:"User is not authorised as a Student"
            })
        }
        next();
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
    
}
exports.isInstructor = async(req,res,next)=>{
    try{
        const accountType = req.user.accountType;
        if(accountType!=="Instructor"){
            return res.status(401).json({
                success:false,
                message:"User is not authorised as a Instructor"
            })
        }
        next();
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
    
}
exports.isAdmin = async(req,res,next)=>{
    try{
        const accountType = req.user.accountType;
        if(accountType!=="Admin"){
            return res.status(401).json({
                success:false,
                message:"User is not authorised as a Admin"
            })
        }
        next();
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            success:false,
            message:"User role cannot be verified"
        })
    }
    
}