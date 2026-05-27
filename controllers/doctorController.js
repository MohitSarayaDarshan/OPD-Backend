const Doctor=require('../models/Doctor')

const registerDoctor=async(req,res)=>{
    try{
        const newDoctor=await Doctor(req.body)
        
        const savedDoctor=await newDoctor.save()
        
        return res.status(201).json(savedDoctor)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllDoctors=async(req,res)=>{
    try{

       const result=await Doctor.aggregate([
        {
            $lookup: {
            from: "hospitals",           // The collection name in MongoDB
            localField: "HospitalID",    // Field in Doctor collection
            foreignField: "HospitalID",  // Field in Hospital collection
            as: "hospitalDetails"        // Temporary array for joined data
            }
        },
        {
            $unwind: "$hospitalDetails"    // Convert array to object
        },
        {
            $project: {
            DoctorID: 1,
            DoctorName: 1,
            Image: 1,
            UserID: 1,
            Experience: 1,
            Rating: 1,
            HospitalName: "$hospitalDetails.HospitalName", // Extract name directly
            Specialty: "$Description" // Mapping Description to Specialty for the UI
            }
        }
        ]);

        res.status(200).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getDoctorById=async(req,res)=>{
    try{
        const result=await Doctor.find({DoctorID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const updateDoctor=async(req,res)=>{
    try{
        const result=await Doctor.findOneAndUpdate({DoctorID:req.params.id},req.body)

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteDoctor=async(req,res)=>{
    try{
        const result=await Doctor.findOneAndDelete({DoctorID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


module.exports={registerDoctor,getAllDoctors,getDoctorById,updateDoctor,deleteDoctor}