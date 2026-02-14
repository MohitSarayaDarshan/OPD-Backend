const Patient=require("../models/Patient")

const getAllPatients=async(req,res)=>{
    try{
        const result=await Patient.find({})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getPatientById=async(req,res)=>{
    try{
        const result=await Patient.find({PatientID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getPatientByEmail=async(req,res)=>{
    console.log(req.body)
    try{
        const result=await Patient.find({Email:req.body.Email})

        return res.status(201).json(result)
    }
    catch(error){
        return res.status(400).json({error:error.message})
    }
}


const registerPatient=async(req,res)=>{
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


const updatePatient=async(req,res)=>{
    try{
        const result=await Patient.findOneAndUpdate({PatientID:req.params.id},req.body)

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const deletePatient=async(req,res)=>{
    try{
        const result=await Patient.findOneAndDelete({PatientID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


module.exports={getAllPatients,getPatientById,registerPatient,getPatientByEmail,updatePatient,deletePatient}