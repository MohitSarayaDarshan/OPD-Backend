const Joi=require('joi')

const registerSchema=Joi.object({
    TreatmentTypeID:Joi.number().positive().required(),
    TreatmentTypeName:Joi.string().max(250).required(),
    TreatmentTypeShortName:Joi.string().max(50),
    HospitalID:Joi.number().required(),
    Description:Joi.string().max(250),
    UserID:Joi.number().positive().required()
})

module.exports=registerSchema