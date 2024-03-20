const express = require("express")
const app = express()
const fileUpload = require("express-fileupload")
const cors = require("cors")
const CourseRoutes = require("./routes/Course")
const ProfileRoutes = require("./routes/Profile")
const PaymentRoutes = require("./routes/Payment")
const UserRoutes = require("./routes/User")

require("dotenv").config()

const PORT = process.env.PORT || 4000;

const {connect} = require("./config/database")
const {cloudinaryConnect} = require("./config/cloudinary")
const cookieParser = require("cookie-parser")

app.use(cors({
    origin:"https://studyx-frontend.vercel.app",
    credentials:true
}))
// app.use(cors({
//     origin:"http://localhost:3000",
//     credentials:true
// }))
connect()
// http://localhost:3000
app.use(cookieParser())

app.use(express.json())

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp"
}))

cloudinaryConnect()
// app.use("/api/auth",UserRoutes)
app.use("/api/v1/auth",UserRoutes)
app.use("/api/v1/course",CourseRoutes)
app.use("/api/v1/payment",PaymentRoutes)
app.use("/api/v1/profile",ProfileRoutes)

app.get("/",(req,res)=>{
    res.send("YOLO! Your Backend is connected")
})

app.listen(PORT,()=>{
    console.log(`Your server is listening at PORT ${PORT}`)
})