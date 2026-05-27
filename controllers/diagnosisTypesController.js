const DiagnosisTypes=require("../models/DiagnosisTypes")

const getAllDiagnosisTypes=async(req,res)=>{
    try{
        const result=await DiagnosisTypes.find({})

        return res.status(201).json(result)
    }
    catch(error){
        return res.status(400).json({error:error.message})
    }
}

const getDiagnosisTypeById=async(req,res)=>{
    try{
        const result=await DiagnosisTypes.find({DiagnosisTypeID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error){
        return res.status(400).json({error:error.message})
    }
}

const registerDiagnosisType=async(req,res)=>{
    try{
        const newDiagnosisType=await DiagnosisTypes(req.body)
       
        const savedDiagnosisType=await newDiagnosisType.save()
       
        return res.status(201).json(savedDiagnosisType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const updateDiagnosisType=async(req,res)=>{
    try{
        const result=await DiagnosisTypes.findOneAndUpdate({DiagnosisTypeID:req.params.id},req.body)

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const deleteDiagnosisType=async(req,res)=>{
    try{
        const result=await DiagnosisTypes.findOneAndDelete({DiagnosisTypeID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


module.exports={getAllDiagnosisTypes,getDiagnosisTypeById,registerDiagnosisType,updateDiagnosisType,deleteDiagnosisType}