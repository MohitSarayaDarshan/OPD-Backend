const Joi=require("joi")

const registerSchema=Joi.object({
    ReceiptID:Joi.number().positive().required(),
    ReceiptNo:Joi.string().max(250),
    ReceiptDate:Joi.date().required(),
    OPDID:Joi.number().positive().required(),
    AmountPaid:Joi.number().positive().required(),
    Description:Joi.string().max(250),
    UserID:Joi.number().positive().required(),
    PaymentModeID:Joi.number().positive().required(),
    ReferenceNo:Joi.string().max(250),
    ReferenceDate:Joi.date(),
    cancellationDateTime:Joi.date(),
    cancellationByUserID:Joi.number().positive(),
    cancellationRemarks:Joi.string().max(500)
})

module.exports=registerSchema