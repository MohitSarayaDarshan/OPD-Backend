const express=require("express");

const registerSchema = require("../validations/hospitalValidation");

const { registerHospital, getAllHospitals, getHospitalById, updateHospital, deleteHospital} = require("../controllers/hospitalController");

const validate = require("../middlewares/validate");

const router = express.Router();


router.get("/", getAllHospitals);

router.get("/:id", getHospitalById);

router.post("/register", validate(registerSchema), registerHospital);

router.put("/update/:id", validate(registerSchema), updateHospital);

router.delete("/delete/:id", deleteHospital);

module.exports = router;