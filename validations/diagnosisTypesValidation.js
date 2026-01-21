const Joi=require("joi")

const registerSchema=Joi.object({
    DiagnosisTypeID:Joi.number().positive().required(),
    DiagnosisTypeName:Joi.string().max(250).required(),
    DiagnosisTypeShortName:Joi.string().max(50),
    IsActive:Joi.boolean().required(),
    HospitalID:Joi.number().positive().required(),
    Description:Joi.string().max(250),
    UserID:Joi.number().positive().required()
})

module.exports=registerSchema