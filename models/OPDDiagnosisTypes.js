const mongoose = require('mongoose')

const OPDDiagnosisTypeSchema = new mongoose.Schema({
  OPDDiagnosisTypeID: { type: Number, unique: true },
  OPDID: { type: Number, required: true, ref: 'OPD' },
  DiagnosisTypeID: { type: Number, required: true, ref: 'DiagnosisType' },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

OPDDiagnosisTypeSchema.pre('save',async function(){
  if(!this.isNew) return;

  try{
    const counter=await Counter.findOneAndUpdate({id:'OPDDiagnosisTypeID'},{$inc:{seq:1}},{new:true,upsert:true})

    this.OPDDiagnosisTypeID=counter.seq;
    console.log(counter.seq);
    
  }
  catch(error){
    throw error;
  }
});

module.exports = mongoose.model('OPDDiagnosisType', OPDDiagnosisTypeSchema);