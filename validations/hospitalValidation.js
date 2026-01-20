const Joi=require("joi")

const registerSchema=Joi.object({
    HospitalID:Joi.number(),
    HospitalName:Joi.string().min(1).max(250),
    DefaultPaymentModeID:Joi.number(),
    RegistrationCharge:Joi.number().precision(2).strict(),
    RegistrationValidityMonths:Joi.number(),
    OpeningDate:Joi.date().required(),
    OpeningPatientNo:Joi.number().integer().positive().required(),
    OpeningOPDNo:Joi.number().integer().positive().required(),
    OpeningReceiptNo:Joi.number().integer().positive().required(),
    Description:Joi.string().max(250),
    UserID:Joi.number().integer().required(),
    Address:Joi.string().min(1).max(250),
    IsRateEnableInReceipt:Joi.boolean(),
    IsRegistrationFeeEnableInOPD:Joi.boolean()
})


module.exports=registerSchema