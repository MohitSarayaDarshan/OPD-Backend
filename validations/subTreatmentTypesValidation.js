const Joi=require('joi')

const registerSchema=Joi.object({
    SubTreatmentTypeID:Joi.number().positive().required(),
    SubTreatmentTypeName:Joi.string().max(250).required(),
    TreatmentTypeID:Joi.number().required(),
    Rate:Joi.number().positive().required(),
    IsActive:Joi.boolean().required(),
    Description:Joi.string().max(250),
    UserID:Joi.number().positive().required(),
    AccountID:Joi.number().positive()
})

module.exports=registerSchema