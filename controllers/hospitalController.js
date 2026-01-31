const Hospital = require("../models/Hospital")

const registerHospital=async(req,res)=>{
    try{
        // const newHospital=await Hospital.insertOne(req.body)
        const newHospital=await Hospital(req.body)

        const savedHospital=await newHospital.save()

        return res.status(201).json(savedHospital)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const getHospitalById=async(req,res)=>{
    try{
        const hospital=await Hospital.find({HospitalID:req.params.id})

        return res.status(201).json(hospital)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllHospitals=async(req,res)=>{
    try{
        const hospitals=await Hospital.find({})

        return res.status(201).json(hospitals)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
const updateHospital=async(req,res)=>{
    try{
        const hospital=await Hospital.findOneAndUpdate({HospitalID:req.params.id},req.body)

        return res.status(201).json(hospital)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteHospital=async(req,res)=>{
    try{
        const hospital=await Hospital.findOneAndDelete({HospitalID:req.params.id})

        return res.status(201).json(hospital)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
 


module.exports={registerHospital,getHospitalById,getAllHospitals,updateHospital,deleteHospital}