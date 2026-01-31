const mongoose = require('mongoose');

const OPDSchema = new mongoose.Schema({
  OPDID: { type: Number, unique: true },
  OPDNo: { type: String, maxLength: 250 },
  OPDDateTime: { type: Date, required: true },
  PatientID: { type: Number, required: true, ref: 'Patient' },
  IsFollowUpCase: { type: Boolean, required: true },
  TreatedByDoctorID: { type: Number, required: true, ref: 'Doctor' },
  RegistrationFee: { type: Number, required: true },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true },
  OLDOPDNo: { type: String, maxLength: 250 }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

OPDSchema.pre('save',async function(){
  if(!this.isNew) return;

  try{
    const counter=await Counter.findOneAndUpdate({id:'OPDID'},{$inc:{seq:1}},{new:true,upsert:true})

    this.OPDID=counter.seq;
    console.log(counter.seq);
    
  }
  catch(error){
    throw error;
  }
});

module.exports = mongoose.model('OPD', OPDSchema);