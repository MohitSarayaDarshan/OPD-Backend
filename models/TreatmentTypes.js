const mongoose = require('mongoose');

const TreatmentTypeSchema = new mongoose.Schema({
  TreatmentTypeID: { type: Number, required: true, unique: true },
  TreatmentTypeName: { type: String, required: true, maxLength: 250 },
  TreatmentTypeShortName: { type: String, maxLength: 50 },
  HospitalID: { type: Number, required: true, ref: 'Hospital' },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

module.exports = mongoose.model('TreatmentType', TreatmentTypeSchema);