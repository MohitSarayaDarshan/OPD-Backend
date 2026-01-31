const Doctor=require('../models/Doctor')

const registerDoctor=async(req,res)=>{
    try{
        const newDoctor=await Hospital(req.body)
        
        const savedDoctor=await newDoctor.save()
        
        return res.status(201).json(savedDoctor)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllDoctors=async(req,res)=>{
    try{

        const result=await Doctor.find({})
        
        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getDoctorById=async(req,res)=>{
    try{
        const result=await Doctor.find({DoctorID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const updateDoctor=async(req,res)=>{
    try{
        const result=await Doctor.findOneAndUpdate({DoctorID:req.params.id},req.body)

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteDoctor=async(req,res)=>{
    try{
        const result=await Doctor.findOneAndDelete({DoctorId:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


module.exports={registerDoctor,getAllDoctors,getDoctorById,updateDoctor,deleteDoctor}