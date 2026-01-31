const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  PatientID: { type: Number, unique: true },
  PatientName: { type: String, required: true, maxLength: 250 },
  PatientNo: { type: Number, required: true },
  RegistrationDateTime: { type: Date, required: true },
  Age: { type: Number },
  BloodGroup: { type: String, maxLength: 20 },
  Gender: { type: String, required: true, maxLength: 10 },
  Occupation: { type: String, maxLength: 100 },
  Address: { type: String, maxLength: 250 },
  HospitalID: { type: Number, required: true, ref: 'Hospital' },
  StateID: { type: Number },
  CityID: { type: Number },
  PinCode: { type: String, maxLength: 10 },
  MobileNo: { type: String, required: true, maxLength: 20 },
  ReferredBy: { type: String, maxLength: 250 },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true },
  EmergencyContactNo: { type: String, maxLength: 20 }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

PatientSchema.pre('save',async function(){
  if(!this.isNew) return;

  try{
    const counter=await Counter.findOneAndUpdate({id:'PatientID'},{$inc:{seq:1}},{new:true,upsert:true})

    this.PatientID=counter.seq;
    console.log(counter.seq);
    
  }
  catch(error){
    throw error;
  }
});


module.exports = mongoose.model('Patient', PatientSchema);