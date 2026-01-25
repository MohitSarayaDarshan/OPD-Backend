const express=require("express");
// const { getAllSubTreamentTypes, getSubTreamentTypeById, registerSubTreamentType, updateSubTreamentType, deleteSubTreamentType } = require("../controllers/subtreatmentTypesController");
const validate = require("../middlewares/validate");
const registerSchema = require("../validations/subTreatmentTypesValidation");
const {getAllSubTreatmentTypes, getSubTreatmentTypeById, registerSubTreatmentType, updateSubTreatmentType, deleteSubTreatmentType}=require("../controllers/subtreatmentTypesController")
const router=express.Router();

router.get("/",getAllSubTreatmentTypes)

router.get("/:id",getSubTreatmentTypeById)

router.post("/register",validate(registerSchema),registerSubTreatmentType)

router.put("/update/:id",validate(registerSchema),updateSubTreatmentType)

router.delete("/delete/:id",deleteSubTreatmentType)

module.exports=router