const SubTreatmentType = require("../models/SubTreatmentTypes")

const registerSubTreatmentType=async(req,res)=>{
    try{
        const newSubTreatmentType=await SubTreatmentType.insertOne(req.body)

        res.status(201).json(newSubTreatmentType)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


const getSubTreatmentTypeById=async(req,res)=>{
    try{
        const SubTreatmentType=await SubTreatmentType.find({SubTreatmentTypeID:req.params.id})

        res.status(201).json(SubTreatmentType)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const getAllSubTreatmentTypes=async(req,res)=>{
    try{
        const SubTreatmentTypes=await SubTreatmentType.find({})

        res.status(201).json(SubTreatmentTypes)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}
const updateSubTreatmentType=async(req,res)=>{
    try{
        const SubTreatmentType=await SubTreatmentType.findOneAndUpdate({SubTreatmentTypeID:req.params.id},req.body)

        res.status(201).json(SubTreatmentType)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const deleteSubTreatmentType=async(req,res)=>{
    try{
        const SubTreatmentType=await SubTreatmentType.findOneAndDelete({SubTreatmentTypeID:req.params.id})

        res.status(201).json(SubTreatmentType)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}
 


module.exports={registerSubTreatmentType,getSubTreatmentTypeById,getAllSubTreatmentTypes,updateSubTreatmentType,deleteSubTreatmentType}