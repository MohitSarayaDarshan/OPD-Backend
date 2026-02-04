const express=require("express");
const validate = require("../middlewares/validate");
const registerSchema = require("../validations/staffValidation");
const { registerStaff, getAllStaffs, getStaffById, updateStaff, deleteStaff } = require("../controllers/staffController");


const router=express.Router();

router.post("/register",validate(registerSchema),registerStaff)

router.get("/",getAllStaffs)

router.get("/:id",getStaffById)

router.put("/update/:id",validate(registerSchema),updateStaff)

router.delete("/delete/:id",deleteStaff)

module.exports=router

