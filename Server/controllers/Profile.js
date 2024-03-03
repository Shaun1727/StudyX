const Profile = require("../models/Profile")
const User = require("../models/User")
const {uploadToCloudinary} = require("../utils/imageUploader")
const { convertSecondsToDuration } = require("../utils/secToDuration")
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")
require("dotenv").config()
exports.updateDetails = async(req,res)=>{
    try{
        const {dateOfBirth="",about="",contactNumber,gender=""} = req.body
        const id= req.user.id
        const userDetails = await User.findById(id)
        const profileDetails = await Profile.findById(userDetails.additionalDetails)
        profileDetails.dateOfBirth = dateOfBirth
        profileDetails.gender = gender
        profileDetails.contactNumber = contactNumber
        profileDetails.about = about
        await profileDetails.save();
        return res.status(200).json({
            success:true,
            profileDetails,
            message:"Successfully updated Profile Details",
        })
    }catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Could not update Profile Details"
        })
    }
}

exports.deleteAccount = async(req,res)=>{
    try{
        const id=req.user.id;

        const userDetails= await User.findById(id);

        if(!userDetails){
            return res.status(401).json({
                success:false,
                message:"User not found"
            })
        }
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails})

        await User.findByIdAndDelete({_id:id})
        return res.status(200).json({
            success:true,
            message:"Succesfully removed account"
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            success:false,
            message:"Something went wrong while deleting account"
        })
    }
}

exports.getUserDetails = async(req,res)=>{
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        console.log(userDetails)
        return res.status(200).json({
            success:true,
            message:"User data fetched successfully",
            data:userDetails,
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.updateDisplayPicture = async(req,res)=>{
    try{
        const id=req.user.id;
        const picture = req.files.ProfilePicture;
        const updateImageResponse = await uploadToCloudinary(picture,process.env.FOLDER_NAME,1000,1000)
        const updatedProfile = await User.findByIdAndUpdate({_id:id},{image:updateImageResponse.secure_url},{new:true});
        return res.status(200).json({
            success:true,
            message:"successfully updated profile picture",
            data:updatedProfile,
        })
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:err.message,
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      let userDetails = await User.findOne({
        _id: userId,
      })
        .populate({
          path: "courses",
          populate: {
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          },
        })
        .exec()
      userDetails = userDetails.toObject()
      var SubsectionLength = 0
      for (var i = 0; i < userDetails.courses.length; i++) {
        let totalDurationInSeconds = 0
        SubsectionLength = 0
        for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
          totalDurationInSeconds += userDetails.courses[i].courseContent[
            j
          ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
          userDetails.courses[i].totalDuration = convertSecondsToDuration(
            totalDurationInSeconds
          )
          SubsectionLength +=
            userDetails.courses[i].courseContent[j].subSection.length
        }
        let courseProgressCount = await CourseProgress.findOne({
          courseID: userDetails.courses[i]._id,
          userId: userId,
        })
        courseProgressCount = courseProgressCount?.completedVideos.length
        if (SubsectionLength === 0) {
          userDetails.courses[i].progressPercentage = 100
        } else {
          // To make it up to 2 decimal point
          const multiplier = Math.pow(10, 2)
          userDetails.courses[i].progressPercentage =
            Math.round(
              (courseProgressCount / SubsectionLength) * 100 * multiplier
            ) / multiplier
        }
      }
  
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }

  exports.instructorDashboard = async (req, res) => {
    try {
      const courseDetails = await Course.find({ instructor: req.user.id })
  
      const courseData = courseDetails.map((course) => {
        const totalStudentsEnrolled = course.studentsEnroled.length
        const totalAmountGenerated = totalStudentsEnrolled * course.price
  
        // Create a new object with the additional fields
        const courseDataWithStats = {
          _id: course._id,
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          // Include other course properties as needed
          totalStudentsEnrolled,
          totalAmountGenerated,
        }
  
        return courseDataWithStats
      })
  
      res.status(200).json({ courses: courseData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: "Server Error" })
    }
}