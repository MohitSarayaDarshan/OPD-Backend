const express=require("express")


const registerSchema = require("../validations/hospitalValidation");

const { registerHospital, getAllHospitals, getHospitalById, updateHospital, deleteHospital } = require("../controllers/hospitalController");

const validate = require("../middlewares/validate");

const router=express.Router()

router.post("/register",validate(registerSchema),registerHospital);

router.get("/",getAllHospitals);

router.get("/:id",getHospitalById);

router.put("/update/:id",validate(registerSchema),updateHospital);

router.delete("/delete/:id",deleteHospital);

module.exports=router;