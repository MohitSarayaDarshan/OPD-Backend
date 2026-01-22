const OPDDiagnosisType = require("../models/OPDDiagnosisTypes")

const registerOPDDiagnosisType=async(req,res)=>{
    try{
        const newOPDDiagnosisType=await OPDDiagnosisType.insertOne(req.body)

        res.status(201).json(newOPDDiagnosisType)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


const getOPDDiagnosisTypeById=async(req,res)=>{
    try{
        const OPDDiagnosisType=await OPDDiagnosisType.find({OPDDiagnosisTypeID:req.params.id})

        res.status(201).json(OPDDiagnosisType)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const getAllOPDDiagnosisTypes=async(req,res)=>{
    try{
        const OPDDiagnosisTypes=await OPDDiagnosisType.find({})

        res.status(201).json(OPDDiagnosisTypes)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}
const updateOPDDiagnosisType=async(req,res)=>{
    try{
        const OPDDiagnosisType=await OPDDiagnosisType.findOneAndUpdate({OPDDiagnosisTypeID:req.params.id},req.body)

        res.status(201).json(OPDDiagnosisType)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const deleteOPDDiagnosisType=async(req,res)=>{
    try{
        const OPDDiagnosisType=await OPDDiagnosisType.findOneAndDelete({OPDDiagnosisTypeID:req.params.id})

        res.status(201).json(OPDDiagnosisType)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}
 


module.exports={registerOPDDiagnosisType,getOPDDiagnosisTypeById,getAllOPDDiagnosisTypes,updateOPDDiagnosisType,deleteOPDDiagnosisType}