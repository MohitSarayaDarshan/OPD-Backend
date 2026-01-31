const mongoose = require('mongoose');

const SubTreatmentTypeSchema = new mongoose.Schema({
  SubTreatmentTypeID: { type: Number, unique: true },
  SubTreatmentTypeName: { type: String, required: true, maxLength: 250 },
  TreatmentTypeID: { type: Number, required: true, ref: 'TreatmentType' },
  Rate: { type: Number, required: true },
  IsActive: { type: Boolean, required: true },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true },
  AccountID: { type: Number }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

SubTreatmentTypeSchema.pre('save',async function(){
  if(!this.isNew) return;

  try{
    const counter=await Counter.findOneAndUpdate({id:'SubTreatmentTypeID'},{$inc:{seq:1}},{new:true,upsert:true})

    this.SubTreatmentTypeID=counter.seq;
    console.log(counter.seq);
    
  }
  catch(error){
    throw error;
  }
});

module.exports = mongoose.model('SubTreatmentType', SubTreatmentTypeSchema);