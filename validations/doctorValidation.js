const Joi=require("joi")

const registerSchema=Joi.object({

    DoctorID: Joi.number().integer().positive().required(),
    DoctorName: Joi.string().min(3).max(250),
    StaffID: Joi.array().items(Joi.number().integer().positive().required()),
    StudentID: Joi.array().items(Joi.number().integer().positive().required()),
    HospitalID: Joi.number().integer().positive().required(),
    Description: Joi.string().min(3).max(250),
    UserID: Joi.number().integer().positive().required()
})

module.exports=registerSchema