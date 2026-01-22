const OPD = require("../models/OPD")

const registerOPD=async(req,res)=>{
    try{
        const newOPD=await OPD.insertOne(req.body)

        res.status(201).json(newOPD)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


const getOPDById=async(req,res)=>{
    try{
        const OPD=await OPD.find({OPDID:req.params.id})

        res.status(201).json(OPD)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const getAllOPDs=async(req,res)=>{
    try{
        const OPDs=await OPD.find({})

        res.status(201).json(OPDs)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}
const updateOPD=async(req,res)=>{
    try{
        const OPD=await OPD.findOneAndUpdate({OPDID:req.params.id},req.body)

        res.status(201).json(OPD)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const deleteOPD=async(req,res)=>{
    try{
        const OPD=await OPD.findOneAndDelete({OPDID:req.params.id})

        res.status(201).json(OPD)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}
 


module.exports={registerOPD,getOPDById,getAllOPDs,updateOPD,deleteOPD}