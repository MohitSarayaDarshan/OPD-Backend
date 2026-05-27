const mongoose = require('mongoose');
const Appointment = require('./models/Appointment');
const fetch = global.fetch || require('node-fetch');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGO_URL);
  await Appointment.findOneAndUpdate({ AppointmentID: 5 }, { Status: 'Confirmed', ConsultationPhase: 'Waiting', TokenNumber: 1 });
  console.log('Set appointment 5 to waiting');
  const loginRes = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Email: 'smitStaff@gmail.com', Password: 'Test1234!', Role: 'staff' })
  });
  const cookie = loginRes.headers.get('set-cookie');
  if (!cookie) throw new Error('No cookie');
  const nextRes = await fetch('http://localhost:3000/api/appointments/next', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', Cookie: cookie },
    body: JSON.stringify({ Email: 'smitStaff@gmail.com', DoctorID: 11 })
  });
  console.log('next', nextRes.status, await nextRes.text());
}

run().catch(err => { console.error(err); process.exit(1); });
