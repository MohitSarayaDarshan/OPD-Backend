const express=require("express");
const validate = require("../middlewares/validate");
const registerSchema = require("../validations/doctorValidation");
const { registerDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor } = require("../controllers/doctorController");


const router=express.Router();

router.post("/register",validate(registerSchema),registerDoctor)

router.get("/",getAllDoctors)

router.get("/:id",getDoctorById)

router.put("/update/:id",validate(registerSchema),updateDoctor)

router.delete("/delete/:id",deleteDoctor)

module.exports=router

