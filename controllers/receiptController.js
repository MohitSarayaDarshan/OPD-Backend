const Receipt = require("../models/Receipt")
const Staff=require("../models/Staff")

const registerReceipt=async(req,res)=>{

    console.log(req.body);
    try{
        const result=await Receipt(req.body)
        
        const savedReceipt=await result.save()
        
        return res.status(201).json(savedReceipt)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const getReceiptById=async(req,res)=>{
    
    try{
        const result=await Receipt.find({ReceiptID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllReceipts=async(req,res)=>{
    try{
        const result=await Receipt.find({})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllReceiptsBystaff=async(req,res)=>{
    const email=req.body.Email
    console.log(email)
    // console.log("get All receipts by staff called")

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

            // join with Receipt
            {
                $lookup: {
                    from: "receipts",
                    localField: "opdsDetails.OPDID",
                    foreignField: "OPDID",
                    as: "receiptsDetails"
                }
            },
            { $unwind: "$receiptsDetails" },
            
            // Project the final shape
            {
                $project: {
                    HospitalID: "$patientsDetails.HospitalID",
                    ReceiptID: "$receiptsDetails.ReceiptID",
                    ReceiptNo: "$receiptsDetails.ReceiptNo",
                    ReceiptDate : "$receiptsDetails.ReceiptDate",
                    PatientName : "$patientsDetails.PatientName",
                    AmountPaid : "$receiptsDetails.AmountPaid",
                    PaymentModeID: "$receiptsDetails.PaymentModeID",
                    ReferenceNo: "$receiptsDetails.ReferenceNo",
                    ReferenceDate: "$receiptsDetails.ReferenceDate",
                    cancellationDateTime: "$receiptsDetails.cancellationDateTime",

                }
            }
        ])
        console.log(result)
        // if (result.length === 0) {
        //     return res.status(404).json({ message: "Staff email not found or no Receipt assigned to this hospital." });
        // }

        return res.status(200).json(result);
    } catch (error) {
        console.error("Aggregation Error:", error);
        return res.status(500).json({ error: error.message });
    }
}

const updateReceipt=async(req,res)=>{

    try{
        const result=await Receipt.findOneAndUpdate({ReceiptID:req.params.id},req.body)

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteReceipt=async(req,res)=>{
    try{
        const result=await Receipt.findOneAndDelete({ReceiptID:req.params.id})

        return res.status(201).json(result)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
 


module.exports={registerReceipt,getAllReceiptsBystaff,getReceiptById,getAllReceipts,updateReceipt,deleteReceipt}