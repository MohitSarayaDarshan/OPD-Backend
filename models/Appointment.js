const mongoose = require('mongoose');
const Counter = require('./Counter');

const AppointmentSchema = new mongoose.Schema({
    AppointmentID: { type: Number },
    PatientID: { type: Number, required: true, ref: 'Patient' },
    DoctorID: { type: Number, required: true, ref: 'Doctor' },
    AppointmentDate: { type: Date, required: true },
    Status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Rejected'],
        default: 'Pending'
    },
    TokenNumber: { type: Number, default: null },
    RejectMessage: { type: String, default: '' },
    ConsultationPhase: {
        type: String,
        enum: ['Waiting', 'InConsultation', 'Completed'],
        default: 'Waiting'
    },
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

AppointmentSchema.pre('save', async function () {
    if (!this.isNew) return

    try {
        const counter = await Counter.findOneAndUpdate(
            { id: 'AppointmentID' },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        )
        this.AppointmentID = counter.seq
        console.log(counter.seq)
    }
    catch (error) {
        throw error;
    }
})

module.exports = mongoose.model('Appointment', AppointmentSchema);
