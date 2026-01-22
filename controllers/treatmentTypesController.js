const  TreatmentType= require("../models/TreatmentTypes")

const registerTreatmentType=async(req,res)=>{
    try{
        const newTreatmentType=await TreatmentType.insertOne(req.body)

        res.status(201).json(newTreatmentType)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


const getTreatmentTypeById=async(req,res)=>{
    try{
        const TreatmentType=await TreatmentType.find({TreatmentTypeID:req.params.id})

        res.status(201).json(TreatmentType)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const getAllTreatmentTypes=async(req,res)=>{
    try{
        const TreatmentTypes=await TreatmentType.find({})

        res.status(201).json(TreatmentTypes)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}
const updateTreatmentType=async(req,res)=>{
    try{
        const TreatmentType=await TreatmentType.findOneAndUpdate({TreatmentTypeID:req.params.id},req.body)

        res.status(201).json(TreatmentType)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const deleteTreatmentType=async(req,res)=>{
    try{
        const TreatmentType=await TreatmentType.findOneAndDelete({TreatmentTypeID:req.params.id})

        res.status(201).json(TreatmentType)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}
 


module.exports={registerTreatmentType,getTreatmentTypeById,getAllTreatmentTypes,updateTreatmentType,deleteTreatmentType}