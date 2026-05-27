const express=require("express")
const { getAllDiagnosisTypes, getDiagnosisTypeById, registerDiagnosisType, updateDiagnosisType, deleteDiagnosisType } = require("../controllers/diagnosisTypesController")
const validate = require("../middlewares/validate")
const registerSchema = require("../validations/diagnosisTypesValidation")

const router=express.Router()

router.get('/',getAllDiagnosisTypes)

router.get('/:id',getDiagnosisTypeById)

router.post('/register',validate(registerSchema),registerDiagnosisType)

router.put('/update/:id',validate(registerSchema),updateDiagnosisType)

router.delete('/delete/:id',deleteDiagnosisType)

module.exports=router