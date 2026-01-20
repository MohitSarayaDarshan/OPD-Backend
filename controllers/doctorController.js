const Doctor=require('../models/Doctor')

const registerDoctor=async(req,res)=>{
    try{
        const doctor=await Doctor.insertOne(req.body)

        res.status(201).json(doctor)
    }
    catch(error)
    {
        console.error({error:error.message})
    }
}

const getAllDoctors=async(req,res)=>{
    try{

        const doctors=await Doctor.find({})
        
        res.status(201).json(doctors)
    }
    catch(error)
    {
        console.error({error:error.message})
    }
}

const getDoctorById=async(req,res)=>{
    try{
        const doctor=await Doctor.find({DoctorID:req.params.id})

        res.status(201).json(doctor)
    }
    catch(error)
    {
        console.error({error:error.message})
    }
}

const updateDoctor=async(req,res)=>{
    try{
        const doctor=await Doctor.findOneAndUpdate({DoctorID:req.params.id},req.body)

        res.status(201).json(doctor)
    }
    catch(error)
    {
        console.error({error:error.message})
    }
}

const deleteDoctor=async(req,res)=>{
    try{
        const doctor=await Doctor.findOneAndDelete({DoctorId:req.params.id})

        res.status(201).json(doctor)
    }
    catch(error)
    {
        console.error({error:error.message})
    }
}


module.exports={registerDoctor,getAllDoctors,getDoctorById,updateDoctor,deleteDoctor}