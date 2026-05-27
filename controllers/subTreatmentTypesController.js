const SubTreatmentType = require("../models/SubTreatmentTypes")

const registerSubTreatmentType=async(req,res)=>{
    try{
        const result=await SubTreatmentType(req.body)
        
        const savedSubTreatmentType=await result.save()
        
        return res.status(201).json(savedSubTreatmentType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const getSubTreatmentTypeById=async(req,res)=>{
    try{
        const result=await SubTreatmentType.find({SubTreatmentTypeID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllSubTreatmentTypes=async(req,res)=>{
    try{
        const result=await SubTreatmentType.find({})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
const updateSubTreatmentType=async(req,res)=>{
    try{
        const result=await SubTreatmentType.findOneAndUpdate({SubTreatmentTypeID:req.params.id},req.body)

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteSubTreatmentType=async(req,res)=>{
    try{
        const result=await SubTreatmentType.findOneAndDelete({SubTreatmentTypeID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
 


module.exports={registerSubTreatmentType,getSubTreatmentTypeById,getAllSubTreatmentTypes,updateSubTreatmentType,deleteSubTreatmentType}