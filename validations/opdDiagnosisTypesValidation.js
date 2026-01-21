const Joi=require("joi")

const registerSchema=Joi.object({
    OPDDiagnosisTypeID:Joi.number().positive().required(),
    OPDID:Joi.number().positive().required(),
    DiagnosisTypeID:Joi.number().positive().required(),
    Description:Joi.string().max(250),
    UserID:Joi.number().positive().required()
})