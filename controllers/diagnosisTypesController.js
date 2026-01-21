const DiagnosisTypes=require("../models/DiagnosisTypes")

const getAllDiagnosisTypes=async(req,res)=>{
    try{
        const data=await DiagnosisTypes.find({})

        res.status(201).json(data)
    }
    catch(error){
        res.status(400).error({error:error.message})
    }
}

const getDiagnosisTypeById=async(req,res)=>{
    try{
        const data=await DiagnosisTypes.find({DiagnosisTypeID:req.params.id})

        res.status(201).json(data)
    }
    catch(error){
        res.status(400).error({error:error.message})
    }
}

const registerDiagnosisType=async(req,res)=>{
    try{
        const data=await DiagnosisTypes.insertOne(req.body)

        res.status(201).json(data)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


const updateDiagnosisType=async(req,res)=>{
    try{
        const data=await DiagnosisTypes.findOneAndUpdate({DiagnosisTypeID:req.params.id},req.body)

        res.status(201).json(data)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


const deleteDiagnosisType=async(req,res)=>{
    try{
        const data=await DiagnosisTypes.findOneAndDelete({DiagnosisTypeID:req.params.id})

        res.status(201).json(data)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


module.exports={getAllDiagnosisTypes,getDiagnosisTypeById,registerDiagnosisType,updateDiagnosisType,deleteDiagnosisType}