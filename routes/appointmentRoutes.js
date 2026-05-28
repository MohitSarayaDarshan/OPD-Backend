const express = require('express')
const {
    bookAppointment,
    getAppointmentByPatient,
    getAppointmentByStaff,
    updateAppointmentStatus,
    advanceToNextAppointment,
    streamDoctorQueue,
    getLiveQueuesSummary
} = require('../controllers/appointmentController')

const router = express.Router()

// Patient books a new appointment
router.post('/book', bookAppointment)

// Patient views their own appointments (GET with patientID in URL)
router.get('/patient/:id', getAppointmentByPatient)

// Staff views all appointments for their hospital (POST - email sent in body)
router.post('/bystaff', getAppointmentByStaff)

// Staff confirms or rejects an appointment  { Status: 'Confirmed' | 'Rejected' }
router.put('/status/:id', updateAppointmentStatus)

// Staff advances to the next confirmed patient
router.put('/next', advanceToNextAppointment)

router.get('/stream/doctor/:doctorId', streamDoctorQueue)

router.get('/live-queues', getLiveQueuesSummary)

module.exports = router
