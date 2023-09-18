const mongoose = require("mongoose");

const SubSectionSchema = new mongoose.Schema({
    title:{type:String,required:true},
    timeDuration:{type:String},
    videoUrl:{type:String},
    description:{type:String},

})

module.exports = mongoose.model("SubSection",SubSectionSchema);