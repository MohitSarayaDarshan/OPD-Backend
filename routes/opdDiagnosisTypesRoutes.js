const express=require("express");
const validate = require("../middlewares/validate");
const registerSchema = require("../validations/opdDiagnosisTypesValidation");
const { registerOPDDiagnosisType, getAllOPDDiagnosisTypes, getOPDDiagnosisTypeById, updateOPDDiagnosisType, deleteOPDDiagnosisType } = require("../controllers/opdDiagnosisTypesController");


const router=express.Router();

router.post("/register",validate(registerSchema),registerOPDDiagnosisType)

router.get("/",getAllOPDDiagnosisTypes)

router.get("/:id",getOPDDiagnosisTypeById)

router.put("/update/:id",validate(registerSchema),updateOPDDiagnosisType)

router.delete("/delete/:id",deleteOPDDiagnosisType)

module.exports=router

