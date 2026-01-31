const Receipt = require("../models/Receipt")

const registerReceipt=async(req,res)=>{
    try{
        const newReceipt=await Receipt(req.body)
        
        const savedReceipt=await newReceipt.save()
        
        return res.status(201).json(savedReceipt)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}


const getReceiptById=async(req,res)=>{
    try{
        const Receipt=await Receipt.find({ReceiptID:req.params.id})

        return res.status(201).json(Receipt)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const getAllReceipts=async(req,res)=>{
    try{
        const Receipts=await Receipt.find({})

        return res.status(201).json(Receipts)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
const updateReceipt=async(req,res)=>{
    try{
        const Receipt=await Receipt.findOneAndUpdate({ReceiptID:req.params.id},req.body)

        return res.status(201).json(Receipt)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}

const deleteReceipt=async(req,res)=>{
    try{
        const Receipt=await Receipt.findOneAndDelete({ReceiptID:req.params.id})

        return res.status(201).json(Receipt)
    }
    catch(error)
    {
        return res.status(400).json({error:error.message})
    }
}
 


module.exports={registerReceipt,getReceiptById,getAllReceipts,updateReceipt,deleteReceipt}