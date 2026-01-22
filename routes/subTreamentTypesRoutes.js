const express=require("express");
const { getAllSubTreamentTypes, getSubTreamentTypeById, registerSubTreamentType, updateSubTreamentType, deleteSubTreamentType } = require("../controllers/subtreatmentTypesController");
const validate = require("../middlewares/validate");
const registerSchema = require("../validations/subTreatmentTypesValidation");

const router=express.Router();

router.get('/',getAllSubTreamentTypes)

router.get('/:id',getSubTreamentTypeById)

router.post('/register',validate(registerSchema),registerSubTreamentType)

router.put('/update/:id',validate(registerSchema),updateSubTreamentType)

router.delete('/delete/:id',deleteSubTreamentType)

module.exports=router