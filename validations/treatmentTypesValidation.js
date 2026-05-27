const Joi = require('joi');

const registerSchema = Joi.object({
    TreatmentTypeID:Joi.number().positive(),
    TreatmentTypeName:Joi.string().max(250).required(),
    TreatmentTypeShortName:Joi.string().max(250),
    HospitalID:Joi.number().required(),
    Description:Joi.string().min(0).max(250),
    UserID:Joi.number().positive().required()
})

module.exports = registerSchema