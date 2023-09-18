const mongoose = require("mongoose");
require("dotenv").config();
exports.connect = ()=>{
    mongoose.connect(process.env.DB_URL,{
        usenewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=> console.log("Sucessfully connected to DB"))
    .catch(()=> console.log("error connecting to DB"))
}