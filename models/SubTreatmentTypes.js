const mongoose = require('mongoose');

const SubTreatmentTypeSchema = new mongoose.Schema({
  SubTreatmentTypeID: { type: Number, required: true, unique: true },
  SubTreatmentTypeName: { type: String, required: true, maxLength: 250 },
  TreatmentTypeID: { type: Number, required: true, ref: 'TreatmentType' },
  Rate: { type: mongoose.Types.Decimal128, required: true },
  IsActive: { type: Boolean, required: true },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true },
  AccountID: { type: Number }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

module.exports = mongoose.model('SubTreatmentType', SubTreatmentTypeSchema);