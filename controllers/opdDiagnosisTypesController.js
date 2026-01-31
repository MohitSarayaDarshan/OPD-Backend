const OPDDiagnosisType = require("../models/OPDDiagnosisTypes")

const registerOPDDiagnosisType=async(req,res)=>{
    try{
        const newOPDDiagnosisType=await OPDDiagnosisType(req.body)
        
                const savedOPDDiagnosisType=await newOPDDiagnosisType.save()
        
                return res.status(201).json(savedOPDDiagnosisType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const getOPDDiagnosisTypeById=async(req,res)=>{
    try{
        const OPDDiagnosisType=await OPDDiagnosisType.find({OPDDiagnosisTypeID:req.params.id})

        return res.status(201).json(OPDDiagnosisType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllOPDDiagnosisTypes=async(req,res)=>{
    try{
        const OPDDiagnosisTypes=await OPDDiagnosisType.find({})

        return res.status(201).json(OPDDiagnosisTypes)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
const updateOPDDiagnosisType=async(req,res)=>{
    try{
        const OPDDiagnosisType=await OPDDiagnosisType.findOneAndUpdate({OPDDiagnosisTypeID:req.params.id},req.body)

        return res.status(201).json(OPDDiagnosisType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteOPDDiagnosisType=async(req,res)=>{
    try{
        const OPDDiagnosisType=await OPDDiagnosisType.findOneAndDelete({OPDDiagnosisTypeID:req.params.id})

        return res.status(201).json(OPDDiagnosisType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
 


module.exports={registerOPDDiagnosisType,getOPDDiagnosisTypeById,getAllOPDDiagnosisTypes,updateOPDDiagnosisType,deleteOPDDiagnosisType}