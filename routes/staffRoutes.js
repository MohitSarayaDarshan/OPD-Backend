const express=require("express");
const validate = require("../middlewares/validate");
const registerSchema = require("../validations/staffValidation");
const { registerStaff, getAllStaffs, getStaffByEmail, getStaffById, updateStaff, deleteStaff } = require("../controllers/staffController");
const { authorize } = require("../middlewares/authMiddleware");

const router=express.Router();

router.post("/register",validate(registerSchema),registerStaff)

router.post("/email",getStaffByEmail)

router.get("/",authorize('admin'),getAllStaffs)

router.get("/:id",getStaffById)

router.put("/update/:id",validate(registerSchema),updateStaff)

router.delete("/delete/:id",deleteStaff)

module.exports=router