const express=require("express");
const {  getAllTreatmentTypes, getTreatmentTypeById, registerTreatmentType, updateTreatmentType, deleteTreatmentType } = require("../controllers/treatmentTypesController");
const validate = require("../middlewares/validate");
const registerSchema = require("../validations/treatmentTypesValidation");

const router=express.Router();

router.get('/',getAllTreatmentTypes)

router.get('/:id',getTreatmentTypeById)

router.post('/register',validate(registerSchema),registerTreatmentType)

router.put('/update/:id',validate(registerSchema),updateTreatmentType)

router.delete('/delete/:id',deleteTreatmentType)

module.exports=router