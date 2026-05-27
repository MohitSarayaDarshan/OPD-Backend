const OPD = require("../models/OPD")
const Staff=require("../models/Staff")

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
    // try{
    //     const result=await OPD.find({OPDID:req.params.id})
        


    //     return res.status(201).json(result)
    // }
    // catch(error)
    // {
    //     return res.status(400).json({error:error.message})
    // }
    const id = parseInt(req.params.id);
    
    try {
        const result = await OPD.aggregate([
            {$match : {OPDID:id}},
            {
                $lookup: {
                    from : "patients",
                    localField : "PatientID",
                    foreignField : "PatientID",
                    as : "patientDetails"
                }
            },

            {$unwind: "$patientDetails"},

            {
                $lookup: {
                    from : "hospitals",
                    localField : "patientDetails.HospitalID",
                    foreignField : "HospitalID",
                    as : "hospitalDetails"
                }
            },

            {$unwind: "$hospitalDetails"},

            {
                $project : {
                    PatientNo : "$patientDetails.PatientNo",
                    PatientName : "$patientDetails.PatientName",
                    Age : "$patientDetails.Age",
                    Gender : "$patientDetails.Gender",
                    BloodGroup : "$patientDetails.BloodGroup",
                    MobileNo : "$patientDetails.MobileNo",
                    RegistrationDateTime : "$RegistrationDateTime",
                    Address : "$hospitalDetails.Address",
                    CityID : "$patientDetails.CityID",
                    StateID : "$patientDetails.StateID",
                    PinCode : "$patientDetails.PinCode",
                    EmergencyContactNo : "$patientDetails.EmergencyContactNo",
                    Occupation : "$patientDetails.Occupation",
                    ReferredBy : "$patientDetails.ReferredBy",
                    HospitalID : "$hospitalDetails.HospitalID",
                    UserID : "$UserID",
                    PatientID : "$patientDetails.PatientID",
                    Description : "$Description",
                }
            }
        ])

        return res.status(200).json(result[0]);
    } catch (error) {
        console.error("Aggregation Error:", error);
        return res.status(500).json({ error: error.message });
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

const getOPDByStaff=async(req,res)=>{
    // console.log(req.body.Email);
    console.log('request',req.body)
    const email = req.body.Email;

    try {
        const result = await Staff.aggregate([
            { $match: {Email: email} },

            // join with Patients
            {
                $lookup: {
                    from: "patients",
                    localField: "HospitalID",
                    foreignField: "HospitalID",
                    as: "patientsDetails"
                }
            },
            { $unwind: "$patientsDetails" },

            // join with OPD
            {
                $lookup: {
                    from: "opds",
                    localField: "patientsDetails.PatientID",
                    foreignField: "PatientID",
                    as: "opdsDetails"
                }
            },
            { $unwind: "$opdsDetails" },
            
            // Project the final shape
            {
                $project: {
                    OPDNo: "$opdsDetails.OPDNo",
                    OPDDateTime: "$opdsDetails.OPDDateTime",
                    RegistrationFee: "$opdsDetails.RegistrationFee",
                    OPDID : "$opdsDetails.OPDID", 
                    IsFollowUpCase : "$opdsDetails.IsFollowUpCase",
                    PatientName : "$patientsDetails.PatientName"
                }
            }
        ])

        // if (result.length === 0) {
        //     return res.status(404).json({ message: "Staff email not found or no patients assigned to this hospital." });
        // }
        // result[0] contains the staff info + their specific hospital's patients
        return res.status(200).json(result);
    } catch (error) {
        console.error("Aggregation Error:", error);
        return res.status(500).json({ error: error.message });
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
 


module.exports={registerOPD,getOPDById,getOPDByStaff,getAllOPDs,updateOPD,deleteOPD,getAllVisits}