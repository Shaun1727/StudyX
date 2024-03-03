const {auth,isInstructor,isAdmin,isStudent} = require("../middlewares/authorization")
const router = require("express").Router();

const {createCourse, getAllCourses, getCourseDetails,
    getFullCourseDetails,editCourse,
getInstructorCourses,deleteCourse} = require("../controllers/Course")


const {
    createCategory,
    showAllCategories,
    categoryPageDetails
} = require("../controllers/Category");
const { deleteSection, updateSection, createSection } = require("../controllers/Section");
const {updateCourseProgress} = require("../controllers/courseProgress")
const {createSubSection, deleteSubSection, updateSubSection}  = require("../controllers/SubSection");
const { createRating, getAverageRating, getAllRating } = require("../controllers/RatingAndReview");
//Category can only be created by the user
router.post("/createCategory",auth,isAdmin,createCategory)

router.get("/showAllCategories",showAllCategories)

router.post("/getCategoryPageDetails",categoryPageDetails)
//Courses can be created,updated and deleted by the Instructor
router.post("/createCourse",auth,isInstructor,createCourse)

router.post("/addSection",auth,isInstructor,createSection)

router.post("/deleteSection",auth,isInstructor,deleteSection)

router.post("/updateSection",auth,isInstructor,updateSection)
//SubSection can be created by the instructor only 
router.post("/addSubSection",auth,isInstructor,createSubSection)

router.post("/deleteSubSection",auth,isInstructor,deleteSubSection)

router.post("/updateSubSection",auth,isInstructor,updateSubSection)

router.get("/getAllCourses",getAllCourses)
//get details for specific course
router.post("/getCourseDetails",getCourseDetails)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)

// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)

//Rating can be given only by a student
router.post("/createRating",auth,isStudent,createRating)

router.get("/getAverageRating",getAverageRating)

router.get("/getReviews",getAllRating)

router.post("/getCategoryPageDetails",categoryPageDetails)

router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

module.exports = router



