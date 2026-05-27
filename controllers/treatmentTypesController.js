const  TreatmentType= require("../models/TreatmentTypes")

const registerTreatmentType=async(req,res)=>{
    try{
        const newTreatmentType=await TreatmentType.insertOne(req.body)

        return res.status(201).json(newTreatmentType)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const getTreatmentTypeById=async(req,res)=>{
    try{
        const treatment=await TreatmentType.find({TreatmentTypeID:req.params.id})

        return res.status(201).json(treatment)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllTreatmentTypes=async(req,res)=>{
    try{
        const treatments=await TreatmentType.find({})

        return res.status(201).json(treatments)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
const updateTreatmentType=async(req,res)=>{
    try{
        const treatement=await TreatmentType.findOneAndUpdate({TreatmentTypeID:req.params.id},req.body)

        return res.status(201).json(treatement)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteTreatmentType=async(req,res)=>{
    try{
        const treatment=await TreatmentType.findOneAndDelete({TreatmentTypeID:req.params.id})

        return res.status(201).json(treatment)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
 


module.exports={registerTreatmentType,getTreatmentTypeById,getAllTreatmentTypes,updateTreatmentType,deleteTreatmentType}