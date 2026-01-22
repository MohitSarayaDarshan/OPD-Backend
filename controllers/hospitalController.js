const Hospital = require("../models/Hospital")

const registerHospital=async(req,res)=>{
    try{
        const newHospital=await Hospital.insertOne(req.body)

        res.status(201).json(newHospital)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


const getHospitalById=async(req,res)=>{
    try{
        const hospital=await Hospital.find({HospitalID:req.params.id})

        res.status(201).json(hospital)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const getAllHospitals=async(req,res)=>{
    try{
        const hospitals=await Hospital.find({})

        res.status(201).json(hospitals)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}
const updateHospital=async(req,res)=>{
    try{
        const hospital=await Hospital.findOneAndUpdate({HospitalID:req.params.id},req.body)

        res.status(201).json(hospital)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const deleteHospital=async(req,res)=>{
    try{
        const hospital=await Hospital.findOneAndDelete({HospitalID:req.params.id})

        res.status(201).json(hospital)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}
 


module.exports={registerHospital,getHospitalById,getAllHospitals,updateHospital,deleteHospital}