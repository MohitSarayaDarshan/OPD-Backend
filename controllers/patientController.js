const Patient=require("../models/Patient")
const Staff=require("../models/Staff")

const getAllPatients=async(req,res)=>{
    try{
        const result=await Patient.find({})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getPatientByStaff=async(req,res)=>{
    // console.log(req.body.Email);
    // console.log('request',req.body)
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
                    as: "hospitalPatients"
                }
            },
            {$unwind:'$hospitalPatients'},

            // join with Hospitals
            {
                $lookup: {
                    from: "hospitals",
                    localField: "HospitalID",
                    foreignField: "HospitalID",
                    as: "hospitalDetails"
                }
            },
            { $unwind: "$hospitalDetails" },
            
            // Project the final shape
            {
                $project: {
                    PatientID: "$hospitalPatients.PatientID",
                    PatientName: "$hospitalPatients.PatientName",
                    Age: "$hospitalPatients.Age",
                    Gender : "$hospitalPatients.Gender",
                    BloodGroup : "$hospitalPatients.BloodGroup",
                    MobileNo : "$hospitalPatients.MobileNo",
                    HospitalName: "$hospitalDetails.HospitalName",
                    // Return the array of patients found
                    patients: "$hospitalPatients" 
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

const getPatientById=async(req,res)=>{
    console.log(req.params.id);
    
    try{
        const result=await Patient.findOne({PatientID:req.params.id})
        console.log(result)
        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getPatientByEmail=async(req,res)=>{
    console.log("hii from email")
    try{
        const result=await Patient.find({Email:req.body.Email})

        return res.status(201).json(result)
    }
    catch(error){
        return res.status(400).json({error:error.message})
    }
}


const registerPatient=async(req,res)=>{
    try{
        const newPatient=await Patient(req.body)
        
        const savedPatient=await newPatient.save()
        
        return res.status(201).json(savedPatient)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const updatePatient=async(req,res)=>{
    console.log(req.params.id)
    try{
        const result=await Patient.findOneAndUpdate({PatientID:req.params.id},req.body)

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const deletePatient=async(req,res)=>{
    try{
        const result=await Patient.findOneAndDelete({PatientID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


module.exports={getAllPatients,getPatientByStaff,getPatientById,registerPatient,getPatientByEmail,updatePatient,deletePatient}