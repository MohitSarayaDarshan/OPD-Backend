const mongoose=require('mongoose')

const DiagnosisTypeSchema = new mongoose.Schema({
  DiagnosisTypeID: { type: Number, required: true, unique: true },
  DiagnosisTypeName: { type: String, required: true, maxLength: 250 },
  DiagnosisTypeShortName: { type: String, maxLength: 50 },
  IsActive: { type: Boolean, required: true },
  HospitalID: { type: Number, required: true },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

module.exports=mongoose.model('DiagnosisType',DiagnosisTypeSchema)