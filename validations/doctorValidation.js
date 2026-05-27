const Joi=require("joi")

const registerSchema=Joi.object({

    
    DoctorName: Joi.string().min(3).max(250),
    StaffID: Joi.array().items(Joi.number().integer().positive()),
    StudentID: Joi.array().items(Joi.number().integer().positive()),
    HospitalID: Joi.number().integer().positive().required(),
    Description: Joi.string().min(3).max(250),
    UserID: Joi.number().integer().positive().required(),
    Image:Joi.string().min(0)
})

module.exports=registerSchema