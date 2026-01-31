const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  ReceiptID: { type: Number, unique: true },
  ReceiptNo: { type: String, maxLength: 250 },
  ReceiptDate: { type: Date, required: true },
  OPDID: { type: Number, required: true, ref: 'OPD' },
  AmountPaid: { type: Number, required: true },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true },
  PaymentModeID: { type: Number, required: true },
  ReferenceNo: { type: String, maxLength: 250 },
  ReferenceDate: { type: Date },
  cancellationDateTime: { type: Date },
  CancellationByUserID: { type: Number },
  CancellationRemarks: { type: String, maxLength: 500 }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

ReceiptSchema.pre('save',async function(){
  if(!this.isNew) return;

  try{
    const counter=await Counter.findOneAndUpdate({id:'ReceiptID'},{$inc:{seq:1}},{new:true,upsert:true})

    this.ReceiptID=counter.seq;
    console.log(counter.seq);
    
  }
  catch(error){
    throw error;
  }
});

module.exports = mongoose.model('Receipt', ReceiptSchema);