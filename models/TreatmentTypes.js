const mongoose = require('mongoose');

const TreatmentTypeSchema = new mongoose.Schema({
  TreatmentTypeID: { type: Number, unique: true },
  TreatmentTypeName: { type: String, required: true, maxLength: 250 },
  TreatmentTypeShortName: { type: String, maxLength: 50 },
  HospitalID: { type: Number, required: true, ref: 'Hospital' },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

TreatmentTypeSchema.pre('save',async function(){
  if(!this.isNew) return;

  try{
    const counter=await Counter.findOneAndUpdate({id:'TreatmentTypeID'},{$inc:{seq:1}},{new:true,upsert:true})

    this.TreatmentTypeID=counter.seq;
    console.log(counter.seq);
    
  }
  catch(error){
    throw error;
  }
});

module.exports = mongoose.model('TreatmentType', TreatmentTypeSchema);