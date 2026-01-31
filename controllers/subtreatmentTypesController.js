const SubTreatmentType = require("../models/SubTreatmentTypes")

const registerSubTreatmentType=async(req,res)=>{
    try{
        const newSubTreatmentType=await SubTreatmentType(req.body)
        
                const savedSubTreatmentType=await newSubTreatmentType.save()
        
                return res.status(201).json(savedSubTreatmentType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const getSubTreatmentTypeById=async(req,res)=>{
    try{
        const SubTreatmentType=await SubTreatmentType.find({SubTreatmentTypeID:req.params.id})

        return res.status(201).json(SubTreatmentType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllSubTreatmentTypes=async(req,res)=>{
    try{
        const SubTreatmentTypes=await SubTreatmentType.find({})

        return res.status(201).json(SubTreatmentTypes)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
const updateSubTreatmentType=async(req,res)=>{
    try{
        const SubTreatmentType=await SubTreatmentType.findOneAndUpdate({SubTreatmentTypeID:req.params.id},req.body)

        return res.status(201).json(SubTreatmentType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteSubTreatmentType=async(req,res)=>{
    try{
        const SubTreatmentType=await SubTreatmentType.findOneAndDelete({SubTreatmentTypeID:req.params.id})

        return res.status(201).json(SubTreatmentType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
 


module.exports={registerSubTreatmentType,getSubTreatmentTypeById,getAllSubTreatmentTypes,updateSubTreatmentType,deleteSubTreatmentType}