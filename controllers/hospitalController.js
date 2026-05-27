const Hospital = require("../models/Hospital")

const registerHospital=async(req,res)=>{
    console.log("Register hospital called.")
    try{
        const newHospital=await Hospital(req.body)

        res.status(201).json(newHospital)
        const savedHospital=await newHospital.save()

        return res.status(201).json(savedHospital)
    }
    catch(error){
        return res.status(400).send({error:error.message})
    }
}

const getHospitalById=async(req,res)=>{
    // console.log("Get hospital by id is called")
    try {
        const hospital = await Hospital.findOne({HospitalID:req.params.id})

        res.status(200).json(hospital)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const getAllHospitals=async(req,res)=>{
    try {
        const Hospitals = await Hospital.find({})
        
        res.status(201).json(Hospitals)
    }
    catch (error) {
        res.status(400).error({error:error.message})
    }
}

const updateHospital=async(req,res)=>{
    try{
        const result=await Hospital.findOneAndUpdate({HospitalID:req.params.id},req.body)

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteHospital=async(req,res)=>{
    try {
        const result = await Hospital.findOneAndDelete({HospitalID:req.params.id})

        return res.status(201).json(result)
    } catch (error) {
        return res.status(400).error({error:error.message})
    }
}

module.exports={registerHospital,getHospitalById,getAllHospitals,updateHospital,deleteHospital}