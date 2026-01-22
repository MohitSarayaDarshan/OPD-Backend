const express=require("express");
const { getAllTreatments, getTreatmentById, registerTreatment, updateTreatment, deleteTreatment } = require("../controllers/treatmentTypesController");
const validate = require("../middlewares/validate");
const registerSchema = require("../validations/treatmentTypesValidation");

const router=express.Router();

router.get('/',getAllTreatments)

router.get('/:id',getTreatmentById)

router.post('/register',validate(registerSchema),registerTreatment)

router.put('/update/:id',validate(registerSchema),updateTreatment)

router.delete('/delete/:id',deleteTreatment)

module.exports=router