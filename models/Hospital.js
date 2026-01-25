const mongoose = require('mongoose');
const Counter = require('./Counter');

const HospitalSchema = new mongoose.Schema({
  HospitalID: { type: Number, unique: true },
  HospitalName: { type: String, required: true, maxLength: 250 },
  DefaultPaymentModeID: { type: Number },
  RegistrationCharge: { type: Number, integer:true },
  RegistrationValidityMonths: { type: Number },
  OpeningDate: { type: Date, required: true },
  OpeningPatientNo: { type: Number, required: true },
  OpeningOPDNo: { type: Number, required: true },
  OpeningReceiptNo: { type: Number, required: true },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true },
  Address: { type: String, maxLength: 500 },
  IsRateEnableInReceipt: { type: Boolean },
  IsRegistrationFeeEnableInOPD: { type: Boolean },
  ImageURL:{type:String}
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });
 

HospitalSchema.pre('save',async function(){
  if(!this.isNew) return;

  try{
    const counter=await Counter.findOneAndUpdate({id:'HospitalID'},{$inc:{seq:1}},{new:true,upsert:true})

    this.HospitalID=counter.seq;
    console.log(counter.seq);
    
  }
  catch(error){
    throw error;
  }
});
module.exports = mongoose.model('Hospital', HospitalSchema);