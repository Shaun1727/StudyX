const {auth} = require("../middlewares/authorization")
const router = require("express").Router();
const {
    login,
    signup,
    changePassword
} = require("../controllers/auth")
const {sendotp} = require("../controllers/auth")
const {
    resetPasswordToken,
    resetPassword
} = require("../controllers/ResetPasword")
router.post("/signup",signup)

router.post("/login",login)

router.post("/changePassword",auth,changePassword)

router.post("/sendotp",sendotp)

router.post("/reset-password-token",resetPasswordToken)

router.post("/reset-password",resetPassword)

module.exports = router
