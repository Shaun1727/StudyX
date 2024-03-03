const mongoose = require("mongoose");
const {mailSender} = require("../utils/mailSender")
const otpTemplate = require("../mail/templates/emailVerificationTemplate")
const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:60*5,
    }
})
let sendVerificationEmail = async(email,otp)=>{
    // console.log("hi")
    try{
        console.log("Sending mail..")
        const Mailresponse = await mailSender(email,"Verification OTP",otpTemplate(otp))
        console.log("Mail sent successfully",Mailresponse)
    }catch(err){
        console.log(err);
    }
}
OTPSchema.pre("save",async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
})
// async(next)=>{
//     //console.log("Sending mail")
//     if(this.isNew){
//         console.log("sending mail")
//         await sendVerificationMail(this.email,this.otp);
//     }
//     next();
// }
const OTP = mongoose.model("OTP",OTPSchema);
module.exports = OTP;