const express = require("express");
const { updateDetails, updateDisplayPicture, deleteAccount,
getEnrolledCourses, getUserDetails,instructorDashboard} = require("../controllers/Profile");
const { auth, isStudent,isInstructor } = require("../middlewares/authorization");
const router = express.Router();


router.put("/updateProfile",auth,updateDetails)
router.put("/updateDisplayPicture",auth,updateDisplayPicture)
router.delete("/deleteAccount",auth,deleteAccount)
router.get("/getEnrolledCourses",auth,isStudent,getEnrolledCourses)
router.get("/getUserDetails",auth,getUserDetails)
router.delete("/deleteProfile",auth,deleteAccount)
router.get("/instructorDashboard", auth, isInstructor, instructorDashboard)

module.exports = router;