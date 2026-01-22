const Receipt = require("../models/Receipt")

const registerReceipt=async(req,res)=>{
    try{
        const newReceipt=await Receipt.insertOne(req.body)

        res.status(201).json(newReceipt)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}


const getReceiptById=async(req,res)=>{
    try{
        const Receipt=await Receipt.find({ReceiptID:req.params.id})

        res.status(201).json(Receipt)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const getAllReceipts=async(req,res)=>{
    try{
        const Receipts=await Receipt.find({})

        res.status(201).json(Receipts)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}
const updateReceipt=async(req,res)=>{
    try{
        const Receipt=await Receipt.findByOneAndUpdate({ReceiptID:req.params.id},req.body)

        res.status(201).json(Receipt)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}

const deleteReceipt=async(req,res)=>{
    try{
        const Receipt=await Receipt.findByOneAndDelete({ReceiptID:req.params.id})

        res.status(201).json(Receipt)
    }
    catch(error)
    {
        res.status(400).error({error:error.message})
    }
}
 


module.exports={registerReceipt,getReceiptById,getAllReceipts,updateReceipt,deleteReceipt}