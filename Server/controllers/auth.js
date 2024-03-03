const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile")
const jwt = require("jsonwebtoken");
const otpgenerator = require("otp-generator");
const { mailSender } = require("../utils/mailSender");
const bcrypt = require("bcrypt")
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
require("dotenv").config();

exports.signup = async(req,res)=>{
    try{
        // console.log("hi")
        const {firstName,lastName,email,password,confirmPassword,accountType,otp,contactNumber}=req.body;
        console.log(req.body);
        if(!firstName || !lastName || !email || !password
            || !confirmPassword ||  !otp ){
             return   res.status(401).json({
                    success:false,
                    message:"Enter the required fields"
                })
            }
            if(password!==confirmPassword){
               return res.status(401).json({
                    success:false,
                    message:"Password and confirm password do not match",
                })
            }
            const existingUser = await User.findOne({email});
            if(existingUser){
                return res.status(401).json({
                    success:false,
                    message:"User already registered!Please Login",
                })
            }
            let result = await OTP.find({email}).sort({createdAt:-1}).limit(1);
            if(!result){
                return res.status(401).json({
                    success:false,
                    message:"Invalid OTP,please try again"
                })
            }
            else if(result[0].otp !== otp){
                return res.status(401).json({
                    success:false,
                    message:"Invalid OTP,please try again"
                })
            }
            const hashedPasword = await bcrypt.hash(password,10);
            const ProfileObj = await Profile.create({
                gender:null,
                contactNumber:null,
                about:null,
                dateOfBirth:null,
            }) 
            const payload = {
                firstName,lastName,email,password:hashedPasword,
                accountType,contactNumber,additionalDetails:ProfileObj._id,
                image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
            }
            const user = await User.create(payload);
            res.status(200).json({
                success:true,
                message:"User registered successfully",
                user,
            })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"User cannot be registered, please try again!",
        })
    }  
}

exports.login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(401).json({
                success:false,
                message:"Please enter the required fields"
            })
        }
        // console.log(email)
        const user = await User.findOne({email});
        // console.log(user.password);
        if(!user){
            return res.status(401).json({
                success:false,
                message:"user does not exist",
            })
        }
        if(await bcrypt.compare(password,user.password)){

            const token = jwt.sign({
                user:user.email,
                id:user._id,
                accountType:user.accountType,
            },
            process.env.JWT_SECRET,{
                expiresIn:"24h"
            })
            // user.token = token;
            // user.password = undefined;
            const options ={
                expiresIn:new Date(Date.now()+3*24*60*60*1000),
                httpOnly:true,
            }
           return res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"User successfully logged in"
            })
        }
        else{
            return res.status(401).json({
                success:false,
                message:"Incorrect password"
            })
        }

    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Could not login"
        })
    }
}

exports.sendotp = async(req,res)=>{
    try{
        console.log("hi")
        const {email} = req.body;
        console.log(email)
        const user = await User.findOne({email});
        if(user){
            return res.status(401).json({
                success:false,
                message:"user already registered"
            })
        }
        var otp = otpgenerator.generate(6,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log(otp)
        const response = await OTP.findOne({otp:otp});
        while(response){
             otp = otpgenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
           response = await OTP.findOne({otp:otp})
        }
        console.log("entering otp")
        let OTPEntry = await OTP.create({
            email,
            otp:otp
        })
        console.log(OTPEntry);
        return res.status(200).json({
            success:true,
            message:"OTP sent successfully!"
        })
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Could not send OTP"
        })
    } 
}

exports.changePassword = async(req,res)=>{
    try{
        const userDetails = await User.findById(req.user.id);
    
        const {oldPassword,newPassword,confirmNewPassword} = req.body;
    
        const passwordValid = await bcrypt.compare(oldPassword,userDetails.password);
            if(!passwordValid){
                return res.status(401).json({
                    success:false,
                    message:"Password is invalid",
                })
            }
        if(newPassword!==confirmNewPassword){
            return res.status(401).json({
                success:false,
                message:"New password and confirm password do not match"
            })
        }
        const hashedPasword = await bcrypt.hash(newPassword,10);
    
        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id,
                                    {password:hashedPasword},{new:true});
        try{
            const mailResponse = await mailSender(updatedUserDetails.email,
                                    `Password updated successfully for ${userDetails.firstName} 
                                    ${userDetails.lastName}`,
                                    passwordUpdated(userDetails.email,userDetails.firstName))
            console.log("Mail response",mailResponse.response)
            return res.status(200).json({
                success:true,
                message:"Successfully changed the Password"
            })
        }catch(err){
            console.log(err);
            return res.status(400).json({
                success:false,
                message:"Error occured while sending mail"
            })
        }
    }
   catch(err){
    console.log(err);
    return res.status(400).json({
        success:false,
        message:"Error occured in changing password"
    })
   }
    
}
