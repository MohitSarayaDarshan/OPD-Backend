const Patient=require("../models/Patient")

const getAllPatients=async(req,res)=>{
    try{
        const data=await Patient.find({})

        res.status(201).json(data)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const getPatientById=async(req,res)=>{
    try{
        const data=await Patient.find({PatientID:req.params.id})

        res.status(201).json(data)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


const registerPatient=async(req,res)=>{
    try{
        const data=await Patient.insertOne(req.body)

        res.status(201).json(data)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


const updatePatient=async(req,res)=>{
    try{
        const data=await Patient.findOneAndUpdate({PatientID:req.params.id},req.body)

        res.status(201).json(data)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


const deletePatient=async(req,res)=>{
    try{
        const data=await Patient.findOneAndDelete({PatientID:req.params.id})

        res.status(201).json(data)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


module.exports={getAllPatients,getPatientById,registerPatient,updatePatient,deletePatient}