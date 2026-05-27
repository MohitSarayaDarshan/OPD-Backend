// // Add this at the VERY TOP of your entry file
// const dns = require('node:dns');
// dns.setDefaultResultOrder('ipv4first'); // Helps with local resolution
// OR force specific servers:
// require('node:dns/promises').setServers(['1.1.1.1', '8.8.8.8']);

const express=require("express")
const http=require('http')
const { Server } = require('socket.io')
const dotenv=require("dotenv")
const cookieParser=require('cookie-parser')
const {protect, authorize}=require('./middlewares/authMiddleware')


const hospitalRoutes=require("./routes/hospitalRoutes")
const doctorRoutes=require("./routes/doctorRoutes")
const diagnosisTypesRoutes=require("./routes/diagnosisTypesRoutes")
const opdDiagnosisTypesRoutes=require("./routes/opdDiagnosisTypesRoutes")
const opdRoutes=require("./routes/opdRoutes")
const patientRoutes=require("./routes/patientRoutes")
const receiptRoutes=require("./routes/receiptRoutes")
const subtreatmentTypesRoutes=require("./routes/subTreatmentTypesRoutes")
const treatmentTypesRoutes=require("./routes/treatmentTypesRoutes")
const staffRoutes=require('./routes/staffRoutes')
const userRoutes=require('./routes/userRoutes')
const appointmentRoutes=require('./routes/appointmentRoutes')
const cors=require("cors")
const connectDB = require("./config/db")

dotenv.config()

const app=express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true
  }
})

connectDB();

app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true                // Allows cookies to be accepted
}))

app.use(cookieParser())

app.use(express.json())

app.use('/api',userRoutes)

app.use(protect);



app.use('/api/hospitals',authorize('admin'), hospitalRoutes)

app.use('/api/doctors',doctorRoutes)

app.use('/api/diagnosistypes',diagnosisTypesRoutes)

app.use('/api/opddiagnosistypes',opdDiagnosisTypesRoutes)

app.use('/api/opds',opdRoutes)

app.use('/api/patients',patientRoutes)

app.use('/api/receipts',receiptRoutes)

app.use('/api/subtreatments',subtreatmentTypesRoutes)

app.use('/api/treatments',treatmentTypesRoutes)

app.use('/api/staffs',staffRoutes)

app.use('/api/appointments',appointmentRoutes)

app.locals.io = io

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id)

  socket.on('register', ({ role, id }) => {
    if (!role || id == null) return
    const room = `${role}:${id}`
    socket.join(room)
    console.log(`Socket ${socket.id} joined room ${room}`)
  })
})

const PORT=process.env.PORT

server.listen(PORT,()=>{
    console.log(`Server listening @ ${PORT}`);
})