const Joi=require("joi")

const registerSchema=Joi.object({
    ReceiptID:Joi.number().positive(),
    ReceiptDate:Joi.date().required(),
    OPDID:Joi.number().positive().required(),
    AmountPaid:Joi.number().positive().required(),
    Description:Joi.string().max(250),
    UserID:Joi.number().positive().required(),
    PaymentModeID:Joi.number().positive().required(),
    ReferenceNo:Joi.string().min(0).max(250),
    ReferenceDate:Joi.date()
})

module.exports=registerSchema