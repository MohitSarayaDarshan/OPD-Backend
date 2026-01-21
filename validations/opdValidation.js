const Joi=require("joi")

const registerSchema=Joi.object({
    OPDID:Joi.number().positive().required(),
    OPDNo:Joi.string().max(250),
    OPDDateTime:Joi.date().required(),
    PatientID:Joi.number().positive().required(),
    IsFollowUpCase:Joi.boolean().required(),
    TreatedByDoctorID:Joi.number().required(),
    RegistrationFee:Joi.number().positive().required(),
    Description:Joi.string().max(250),
    UserID:Joi.number().positive().required(),
    OLDOPDNo:Joi.string().max(250)
})

module.exports=registerSchema