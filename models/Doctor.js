const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  DoctorID: { type: Number, required: true, unique: true },
  DoctorName: { type: String, required: true, maxLength: 250 },
  StaffID: [{ type: Number }],
  StudentID: [{ type: Number }],
  HospitalID: { type: Number, required: true, ref: 'Hospital' },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

module.exports = mongoose.model('Doctor', DoctorSchema);