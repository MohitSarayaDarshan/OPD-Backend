const Doctor = require('../models/Doctor')
const Appointment = require('../models/Appointment')
const Staff = require('../models/Staff')

async function bookAppointment(req, res) {
    console.log(req.body)
    try {
        const newAppointment = await Appointment(req.body)
        const savedAppointment = await newAppointment.save()
        return res.status(201).json(savedAppointment)
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}

// Patient views their own appointments — joined with doctor + hospital info
async function getAppointmentByPatient(req, res) {
    console.log(req.params.id)
    try {
        const result = await Appointment.aggregate([
            { $match: { PatientID: parseInt(req.params.id) } },
            {
                $lookup: {
                    from: 'doctors',
                    localField: 'DoctorID',
                    foreignField: 'DoctorID',
                    as: 'doctorDetails'
                }
            },
            { $unwind: { path: '$doctorDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'hospitals',
                    localField: 'doctorDetails.HospitalID',
                    foreignField: 'HospitalID',
                    as: 'hospitalDetails'
                }
            },
            { $unwind: { path: '$hospitalDetails', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    AppointmentID: 1,
                    PatientID: 1,
                    DoctorID: 1,
                    AppointmentDate: 1,
                    Status: 1,
                    TokenNumber: 1,
                    RejectMessage: 1,
                    ConsultationPhase: 1,
                    Created: 1,
                    DoctorName: '$doctorDetails.DoctorName',
                    DoctorImage: '$doctorDetails.Image',
                    DoctorSpecialty: '$doctorDetails.Description',
                    HospitalName: '$hospitalDetails.HospitalName',
                    HospitalAddress: '$hospitalDetails.Address'
                }
            },
            { $sort: { Created: -1 } }
        ])
        return res.status(200).json(result)
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}

// Staff views all appointments for doctors in their hospital
// Called via POST so email can be sent in body
async function getAppointmentByStaff(req, res) {
    const email = req.body.Email
    console.log('getAppointmentByStaff called for:', email)

    try {
        // Step 1: Find the staff member by email to get their HospitalID
        const staff = await Staff.findOne({ Email: email })
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' })
        }

        const hospitalID = staff.HospitalID  // single Number in Staff schema

        // Step 2: Find all doctors belonging to this hospital
        // Doctor.HospitalID is also a single Number
        const doctors = await Doctor.find({ HospitalID: hospitalID })
        const doctorIDs = doctors.map(d => d.DoctorID)

        if (doctorIDs.length === 0) {
            return res.status(200).json([])
        }

        // Step 3: Find all appointments for those doctors, join patient + doctor info
        const result = await Appointment.aggregate([
            { $match: { DoctorID: { $in: doctorIDs } } },
            {
                $lookup: {
                    from: 'patients',
                    localField: 'PatientID',
                    foreignField: 'PatientID',
                    as: 'patientDetails'
                }
            },
            { $unwind: { path: '$patientDetails', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'doctors',
                    localField: 'DoctorID',
                    foreignField: 'DoctorID',
                    as: 'doctorDetails'
                }
            },
            { $unwind: { path: '$doctorDetails', preserveNullAndEmptyArrays: true } },
            {
                $project: {
                    AppointmentID: 1,
                    PatientID: 1,
                    DoctorID: 1,
                    AppointmentDate: 1,
                    Status: 1,
                    TokenNumber: 1,
                    RejectMessage: 1,
                    ConsultationPhase: 1,
                    Created: 1,
                    PatientName: '$patientDetails.PatientName',
                    PatientMobile: '$patientDetails.MobileNo',
                    PatientAge: '$patientDetails.Age',
                    PatientGender: '$patientDetails.Gender',
                    DoctorName: '$doctorDetails.DoctorName',
                    DoctorSpecialty: '$doctorDetails.Description'
                }
            },
            { $sort: { Created: -1 } }
        ])

        return res.status(200).json(result)
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

// Staff confirms or rejects an appointment
function getUtcDayRange(dateValue) {
    const date = new Date(dateValue)
    const start = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()))
    const end = new Date(start)
    end.setUTCDate(end.getUTCDate() + 1)
    return { start, end }
}

async function updateAppointmentStatus(req, res) {
    const { id } = req.params       // AppointmentID
    const { Status, RejectMessage } = req.body

    try {
        const appointment = await Appointment.findOne({ AppointmentID: parseInt(id) })
        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' })
        }

        const updateData = { Status }

        if (Status === 'Confirmed') {
            const { start, end } = getUtcDayRange(appointment.AppointmentDate)

            const confirmedAppointments = await Appointment.find({
                DoctorID: appointment.DoctorID,
                Status: 'Confirmed',
                AppointmentDate: { $gte: start, $lt: end },
                AppointmentID: { $ne: appointment.AppointmentID }
            }).sort({ AppointmentDate: 1, AppointmentID: 1 })

            const orderedAppointments = [...confirmedAppointments, appointment].sort((a, b) => {
                const dateA = new Date(a.AppointmentDate).getTime()
                const dateB = new Date(b.AppointmentDate).getTime()
                if (dateA !== dateB) return dateA - dateB
                return a.AppointmentID - b.AppointmentID
            })

            const bulkOps = []
            orderedAppointments.forEach((appt, index) => {
                const token = index + 1
                if (appt.AppointmentID === appointment.AppointmentID) {
                    updateData.TokenNumber = token
                    updateData.ConsultationPhase = 'Waiting'
                    updateData.RejectMessage = ''
                }
                if (appt.TokenNumber !== token || appt.Status !== 'Confirmed') {
                    bulkOps.push({
                        updateOne: {
                            filter: { AppointmentID: appt.AppointmentID },
                            update: {
                                $set: {
                                    TokenNumber: token,
                                    Status: 'Confirmed',
                                    ConsultationPhase: 'Waiting',
                                    RejectMessage: ''
                                }
                            }
                        }
                    })
                }
            })

            if (bulkOps.length > 0) {
                await Appointment.bulkWrite(bulkOps)
            }

            const updated = await Appointment.findOne({ AppointmentID: parseInt(id) })
            return res.status(200).json(updated)
        }

        if (Status === 'Rejected') {
            updateData.RejectMessage = RejectMessage || 'Appointment was rejected. Please try another date.'
            updateData.ConsultationPhase = null
            updateData.TokenNumber = null
        }

        const updated = await Appointment.findOneAndUpdate(
            { AppointmentID: parseInt(id) },
            updateData,
            { new: true }
        )
        if (!updated) {
            return res.status(404).json({ message: 'Appointment not found' })
        }
        return res.status(200).json(updated)
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}

async function advanceToNextAppointment(req, res) {
    const { Email } = req.body
    const io = req.app.locals.io

    const getTodayRange = () => {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const end = new Date(start)
        end.setDate(end.getDate() + 1)
        return { start, end }
    }

    try {
        console.log('advanceToNextAppointment body:', req.body)
        const staff = await Staff.findOne({ Email })
        if (!staff) {
            return res.status(404).json({ message: 'Staff not found' })
        }

        const doctors = await Doctor.find({ HospitalID: staff.HospitalID })
        let doctorIDs = doctors.map(d => d.DoctorID)
        if (doctorIDs.length === 0) {
            return res.status(200).json({ message: 'No doctors found for this hospital' })
        }

        let strictDoctor = false
        let requestedDoctor = null

        // Optional: restrict to a specific doctor if provided by the staff UI
        if (req.body?.DoctorID) {
            const requested = parseInt(req.body.DoctorID)
            if (!doctorIDs.includes(requested)) {
                return res.status(400).json({ message: 'Doctor not found for your hospital' })
            }
            strictDoctor = true
            requestedDoctor = requested
        }

        console.log('Hospital doctors:', doctors.map(d => d.DoctorID))
        console.log('Using doctorIDs for next:', doctorIDs)
        console.log('Strict doctor advancement:', strictDoctor, 'RequestedDoctor:', requestedDoctor)

        const { start, end } = getTodayRange()

        const currentFilter = {
            DoctorID: strictDoctor ? requestedDoctor : { $in: doctorIDs },
            Status: 'Confirmed',
            ConsultationPhase: 'InConsultation',
            AppointmentDate: { $gte: start, $lt: end }
        }

        const currentAppointment = await Appointment.findOneAndUpdate(
            currentFilter,
            { ConsultationPhase: 'Completed' },
            { sort: { TokenNumber: 1 }, new: true }
        )

        console.log('Completed appointment (if any):', currentAppointment && { AppointmentID: currentAppointment.AppointmentID, DoctorID: currentAppointment.DoctorID, TokenNumber: currentAppointment.TokenNumber })

        const nextQuery = {
            DoctorID: strictDoctor
                ? requestedDoctor
                : currentAppointment?.DoctorID || { $in: doctorIDs },
            Status: 'Confirmed',
            ConsultationPhase: 'Waiting',
            AppointmentDate: { $gte: start, $lt: end }
        }

        const nextAppointment = await Appointment.findOneAndUpdate(
            nextQuery,
            { ConsultationPhase: 'InConsultation' },
            { sort: { TokenNumber: 1 }, new: true }
        )

        console.log('Next appointment chosen:', nextAppointment && { AppointmentID: nextAppointment.AppointmentID, DoctorID: nextAppointment.DoctorID, TokenNumber: nextAppointment.TokenNumber })

        if (!nextAppointment) {
            return res.status(200).json({ message: 'No waiting confirmed appointments available' })
        }

        const doctor = doctors.find(d => d.DoctorID === nextAppointment.DoctorID)
        const payload = {
            AppointmentID: nextAppointment.AppointmentID,
            PatientID: nextAppointment.PatientID,
            TokenNumber: nextAppointment.TokenNumber,
            DoctorName: doctor?.DoctorName || 'Doctor',
            message: `#${nextAppointment.TokenNumber} is now being consulted`
        }

        if (io) {
            io.to(`patient:${nextAppointment.PatientID}`).emit('consultationStarted', payload)
            io.to(`staff:${staff.StaffID}`).emit('consultationStarted', payload)
        }

        return res.status(200).json({ nextAppointment: nextAppointment, message: payload.message })
    }
    catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message })
    }
}

module.exports = { bookAppointment, getAppointmentByPatient, getAppointmentByStaff, updateAppointmentStatus, advanceToNextAppointment }
