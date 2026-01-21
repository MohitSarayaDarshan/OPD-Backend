const express=require("express")


const registerSchema = require("../validations/opdValidation");

const { registerOPD, getAllOPDs, getOPDById, updateOPD, deleteOPD } = require("../controllers/opdController");

const validate = require("../middlewares/validate");

const router=express.Router()

router.post("/register",validate(registerSchema),registerOPD);

router.get("/",getAllOPDs);

router.get("/:id",getOPDById);

router.put("/update/:id",validate(registerSchema),updateOPD);

router.delete("/delete/:id",deleteOPD);

module.exports=router;