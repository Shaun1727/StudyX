const nodemailer = require("nodemailer"); 
exports.mailSender = async(email,title,body)=>{
    try{
        let transporter = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASSWORD,
            }
        })
        let info = await transporter.sendMail({
            from:"StudyNotion | By Shaun",
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`
        })
        console.log(info)
        return info;
    }catch(err){
        
    }
}
