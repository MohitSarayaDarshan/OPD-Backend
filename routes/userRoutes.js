const express=require("express");
const validate = require("../middlewares/validate");
const registerSchema = require("../validations/userValidation");
const {signupUser,loginUser,logoutUser}=require("../controllers/userController")

const router=express.Router();

router.post("/signup",validate(registerSchema),signupUser)

router.post("/login",loginUser)

router.get("/logout",logoutUser)


module.exports=router

