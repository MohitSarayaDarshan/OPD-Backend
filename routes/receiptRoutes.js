const express=require("express");
const { getAllReceipts, getReceiptById, registerReceipt, updateReceipt, deleteReceipt, getAllReceiptsBystaff } = require("../controllers/receiptController");
const validate = require("../middlewares/validate");
const registerSchema = require("../validations/receiptValidation");

const router=express.Router();

router.get('/',getAllReceipts)

router.post('/bystaff', getAllReceiptsBystaff)

router.post('/register',validate(registerSchema),registerReceipt)


router.get('/:id',getReceiptById)

router.put('/update/:id',validate(registerSchema),updateReceipt)

router.delete('/delete/:id',deleteReceipt)

module.exports=router