const express=require("express");
const { getAllPatients, getPatientById, registerPatient, updatePatient, deletePatient } = require("../controllers/patientController");
const validate = require("../middlewares/validate");
const registerSchema = require("../validations/patientValidation");

const router=express.Router();

router.get('/',getAllPatients)

router.get('/:id',getPatientById)

router.post('/register',validate(registerSchema),registerPatient)

router.put('/update/:id',validate(registerSchema),updatePatient)

router.delete('/delete/:id',deletePatient)

module.exports=router