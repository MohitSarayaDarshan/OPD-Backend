const Joi=require("joi")

const registerSchema=Joi.object({
    PatientName:Joi.string().max(250).required(),
    RegistrationDateTime:Joi.date().required(),
    Age:Joi.number().positive(),
    BloodGroup:Joi.string().min(1).max(20),
    Gender:Joi.string().min(1).max(10).required(),
    Occupation:Joi.string().max(100),
    Address:Joi.string().max(250),
    HospitalID:Joi.number().required(),
    StateID:Joi.number().positive(),
    CityID:Joi.number().positive(),
    PinCode:Joi.string().max(10),
    MobileNo:Joi.string().length(10).required(),
    ReferredBy:Joi.string().max(250),
    Description:Joi.string().max(250),
    UserID: Joi.number().positive().required(),
    EmergencyContactNo:Joi.string().max(20) 
})

module.exports=registerSchema