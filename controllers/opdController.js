const OPD = require("../models/OPD")

const registerOPD=async(req,res)=>{
    try{
        const newOPD=await OPD(req.body)
        
        const savedOPD=await newOPD.save()
        
        return res.status(201).json(savedOPD)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const getOPDById=async(req,res)=>{
    try{
        const result=await OPD.find({OPDID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllOPDs=async(req,res)=>{
    try{
        const result=await OPD.find({})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
const updateOPD=async(req,res)=>{
    try{
        const result=await OPD.findOneAndUpdate({OPDID:req.params.id},req.body)

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteOPD=async(req,res)=>{
    try{
        const result=await OPD.findOneAndDelete({OPDID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
 


module.exports={registerOPD,getOPDById,getAllOPDs,updateOPD,deleteOPD}