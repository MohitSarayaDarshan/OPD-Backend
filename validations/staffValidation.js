const Joi=require("joi")

const registerSchema=Joi.object({
    StaffName:Joi.string().max(250).required(),
    HospitalID:Joi.number().required(),
    UserID:Joi.number().required(),
    Image:Joi.string().min(0),
    Description:Joi.string().min(0),
    Role:Joi.string().min(0)
})

module.exports=registerSchema