const mongoose = require('mongoose')

const DiagnosisTypeSchema = new mongoose.Schema({
  DiagnosisTypeID: { type: Number, unique: true },
  DiagnosisTypeName: { type: String, required: true, maxLength: 250 },
  DiagnosisTypeShortName: { type: String, maxLength: 50 },
  IsActive: { type: Boolean, required: true },
  HospitalID: { type: Number, required: true },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

DiagnosisTypeSchema.pre('save',async function(){
  if(!this.isNew) return;

  try{
    const counter=await Counter.findOneAndUpdate({id:'DiagnosisTypeID'},{$inc:{seq:1}},{new:true,upsert:true})

    this.DiagnosisTypeID=counter.seq;
    console.log(counter.seq);
    
  }
  catch(error){
    throw error;
  }
});

module.exports = mongoose.model('DiagnosisType', DiagnosisTypeSchema);