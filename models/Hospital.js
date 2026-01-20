const mongoose = require('mongoose');

const HospitalSchema = new mongoose.Schema({
  HospitalID: { type: Number, required: true, unique: true },
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
  IsRegistrationFeeEnableInOPD: { type: Boolean }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });
 
module.exports = mongoose.model('Hospital', HospitalSchema);