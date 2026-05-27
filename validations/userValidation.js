const Joi=require('joi')

const registerSchema=Joi.object({
    Email:Joi.string().required(),
    Password:Joi.string().required(),
    Role:Joi.string().required()
})

module.exports=registerSchema