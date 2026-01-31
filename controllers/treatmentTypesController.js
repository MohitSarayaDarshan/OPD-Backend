const  TreatmentType= require("../models/TreatmentTypes")

const registerTreatmentType=async(req,res)=>{
    try{
        const newTreatmentType=await TreatmentType(req.body)
        
        const savedTreatmentType=await newTreatmentType.save()
        
        return res.status(201).json(savedTreatmentType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const getTreatmentTypeById=async(req,res)=>{
    try{
        const result=await TreatmentType.find({TreatmentTypeID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllTreatmentTypes=async(req,res)=>{
    try{
        const result=await TreatmentType.find({})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
const updateTreatmentType=async(req,res)=>{
    try{
        const result=await TreatmentType.findOneAndUpdate({TreatmentTypeID:req.params.id},req.body)

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteTreatmentType=async(req,res)=>{
    try{
        const result=await TreatmentType.findOneAndDelete({TreatmentTypeID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}



module.exports={registerTreatmentType,getTreatmentTypeById,getAllTreatmentTypes,updateTreatmentType,deleteTreatmentType}