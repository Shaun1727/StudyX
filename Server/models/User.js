const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        trim:true,
        required:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Student","Admin","Instructor"],
        required:true,
    },
    active:{
        type:Boolean,
        default:true,
    },
    approved:{
        type:Boolean,
        default:true,
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Profile"
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    token:{
        type:String,
    },
    resetPasswordExpires:{
        type:Date,
    },
    image:{
        type:String,
        required:true,
    },
    courseProgress:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"CourseProgress"
        }
    ]
    },
    {timestamps:true}
)

module.exports = mongoose.model("User",UserSchema);