const OPDDiagnosisTypeSchema = new mongoose.Schema({
  OPDDiagnosisTypeID: { type: Number, required: true, unique: true },
  OPDID: { type: Number, required: true, ref: 'OPD' },
  DiagnosisTypeID: { type: Number, required: true, ref: 'DiagnosisType' },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });