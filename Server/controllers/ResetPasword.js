const User = require("../models/User")
const crypto = require("crypto");
const { mailSender } = require("../utils/mailSender");
const bcrypt = require("bcrypt")
exports.resetPasswordToken = async(req,res)=>{
    try{
    const {email} = req.body;

    const user = await User.findOne({email:email})

    if(!user){
        return res.status(401).json({
            success:false,
            message:"User is not registered with our platform, please sign up!"
        })
    }

    const token = crypto.randomBytes(20).toString("hex");

    const updatedUserDetails = await User.findOneAndUpdate({email:email},{token,
        resetPasswordExpires:Date.now() + 360000},{new:true});

    console.log("updated user details ",updatedUserDetails);

    const url = `http://localhost:3000/update-password/${token}`

    const mailResponse = await mailSender(email,"Password Reset",
    `Your Link for email verification is ${url}. Please click this url to reset your password.`)
    // console.log(mailResponse);
    return res.status(200).json({
        success:true,
        message:"Succesfully sent reset password link to the user's email credentials!"
    })  
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.resetPassword = async(req,res)=>{
    try{
        const {password,confirmPassword,token} = req.body;
        console.log(password)
        if(password!==confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Pssword and confirm Password do not match",
            })
        }
        const userDetails = await User.findOne({token:token});

        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"Token Invalid"
            })
        }
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(401).json({
                success:false,
                message:"Session expired",
            })
        }
        const newPassword = await bcrypt.hash(password,10);
        const updatedUserDetails = await User.findOneAndUpdate({token:token},{password:newPassword},{new:true});
        return res.status(200).json({
            success:true,
            message:"Succesfully changed the password"
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}