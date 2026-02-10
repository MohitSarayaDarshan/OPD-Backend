const express=require("express")
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
const subtreatmentTypesRoutes=require("./routes/subTreamentTypesRoutes")
const treatmentTypesRoutes=require("./routes/treatmentTypesRoutes")
const staffRoutes=require('./routes/staffRoutes')
const userRoutes=require('./routes/userRoutes')
const cors=require("cors")
const connectDB = require("./config/db")

dotenv.config()

const app=express()

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

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server listening @ ${PORT}`);
})