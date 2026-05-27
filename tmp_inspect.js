const mongoose = require('mongoose');
const Appointment = require('./models/Appointment');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGO_URL);
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  const apps = await Appointment.find({ AppointmentDate: { $gte: start, $lt: end } }).sort({ Token: 1 });
  console.log('today', start, end);
  console.log(JSON.stringify(apps.map(a => ({ AppointmentID: a.AppointmentID, PatientID: a.PatientID, DoctorID: a.DoctorID, Status: a.Status, Token: a.Token, AppointmentDate: a.AppointmentDate })), null, 2));
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
