const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  PatientID: { type: Number, required: true, unique: true },
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
  MobileNo: { type: String, required: true, minLength:10, maxLength: 10 },
  ReferredBy: { type: String, maxLength: 250 },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true },
  EmergencyContactNo: { type: String, maxLength: 20 }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

module.exports = mongoose.model('Patient', PatientSchema);