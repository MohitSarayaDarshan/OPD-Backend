const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  ReceiptID: { type: Number, required: true, unique: true },
  ReceiptNo: { type: String, maxLength: 250 },
  ReceiptDate: { type: Date, required: true },
  OPDID: { type: Number, required: true, ref: 'OPD' },
  AmountPaid: { type: mongoose.Types.Decimal128, required: true },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true },
  PaymentModeID: { type: Number, required: true },
  ReferenceNo: { type: String, maxLength: 250 },
  ReferenceDate: { type: Date },
  cancellationDateTime: { type: Date },
  cancellationByUserID: { type: Number },
  cancellationRemarks: { type: String, maxLength: 500 }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

module.exports = mongoose.model('Receipt', ReceiptSchema);