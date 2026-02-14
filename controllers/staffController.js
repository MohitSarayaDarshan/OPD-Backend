const Staff=require('../models/Staff')

const registerStaff=async(req,res)=>{
    try{
        const newStaff=await Staff(req.body)
        
        const savedStaff=await newStaff.save()
        
        return res.status(201).json(savedStaff)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllStaffs=async(req,res)=>{
    try{

        const result=await Staff.find({})
        
        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getStaffById=async(req,res)=>{
    try{
        const result=await Staff.find({StaffID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getStaffByEmail=async(req,res)=>{
    try{
        const result=await Staff.find({Email:req.body.Email})

        return res.status(201).json(result)
    }
    catch(error){
        return res.status(400).json({error:error.message})
    }
}

const updateStaff=async(req,res)=>{
    try{
        const result=await Staff.findOneAndUpdate({StaffID:req.params.id},req.body)

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteStaff=async(req,res)=>{
    try{
        const result=await Staff.findOneAndDelete({StaffID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


module.exports={registerStaff,getAllStaffs,getStaffById,getStaffByEmail,updateStaff,deleteStaff}