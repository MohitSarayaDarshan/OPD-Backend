const Patient=require("../models/Patient")

const getAllPatients=async(req,res)=>{
    try{
        const newPatient=await Patient(req.body)
        
        const savedPatient=await newPatient.save()
        
        return res.status(201).json(savedPatient)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getPatientById=async(req,res)=>{
    try{
        const data=await Patient.find({PatientID:req.params.id})

        return res.status(201).json(data)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const registerPatient=async(req,res)=>{
    try{
        const data=await Patient.insertOne(req.body)

        return res.status(201).json(data)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const updatePatient=async(req,res)=>{
    try{
        const data=await Patient.findOneAndUpdate({PatientID:req.params.id},req.body)

        return res.status(201).json(data)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const deletePatient=async(req,res)=>{
    try{
        const data=await Patient.findOneAndDelete({PatientID:req.params.id})

        return res.status(201).json(data)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


module.exports={getAllPatients,getPatientById,registerPatient,updatePatient,deletePatient}