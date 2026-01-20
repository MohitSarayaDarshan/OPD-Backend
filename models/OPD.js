const mongoose = require('mongoose');

const OPDSchema = new mongoose.Schema({
  OPDID: { type: Number, required: true, unique: true },
  OPDNo: { type: String, maxLength: 250 },
  OPDDateTime: { type: Date, required: true },
  PatientID: { type: Number, required: true, ref: 'Patient' },
  IsFollowUpCase: { type: Boolean, required: true },
  TreatedByDoctorID: { type: Number, required: true, ref: 'Doctor' },
  RegistrationFee: { type: mongoose.Types.Decimal128, required: true },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true },
  OLDOPDNo: { type: String, maxLength: 250 }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

module.exports = mongoose.model('OPD', OPDSchema);