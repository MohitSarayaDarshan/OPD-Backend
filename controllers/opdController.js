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

const getAllVisits=async(req,res)=>{

    const searchId=parseInt(req.params.id)
    console.log(searchId)
    try{
                const visitHistory = await OPD.aggregate([
                { $match: { PatientID: searchId} },
        
                // 1. Join with Doctors
                {
                    $lookup: {
                    from: "doctors",
                    localField: "TreatedByDoctorID",
                    foreignField: "DoctorID",
                    as: "doctorDetails"
                    }
                },
                { $unwind: "$doctorDetails" },

                // 2. Join with Hospitals 
                // (Assuming HospitalID exists in your OPD or Doctor document)
                {
                    $lookup: {
                    from: "hospitals",           // Name of your hospital collection
                    localField: "doctorDetails.HospitalID",    // The field in your OPD schema
                    foreignField: "HospitalID",  // The ID field in Hospital schema
                    as: "hospitalDetails"
                    }
                },
                { $unwind: { path: "$hospitalDetails", preserveNullAndEmptyArrays: true } },

                // { $sort: { OPDDateTime: -1 } },

                // 3. Project the final shape
                {
                    $project: {
                    OPDID: 1,
                    OPDNo: 1,
                    IsFollowUpCase:1,
                    OPDDateTime: 1,
                    IsFollowUpCase: 1,
                    Description: 1,
                    RegistrationFee: 1,
                    DoctorName: "$doctorDetails.DoctorName",
                    HospitalName: "$hospitalDetails.HospitalName",
                    HospitalLocation: "$hospitalDetails.Address"
                    }
                }
                ]);
        
        // const visitHistory=await OPD.find({PatientID:req.params.id})

        console.log(visitHistory);

    return res.status(201).json(visitHistory)
    }
    catch(error){

        return res.status(400).json({error:error.message})

    }
}
 


module.exports={registerOPD,getOPDById,getAllOPDs,updateOPD,deleteOPD,getAllVisits}