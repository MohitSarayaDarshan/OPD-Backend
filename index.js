const express=require("express")
const dotenv=require("dotenv")


const hospitalRoutes=require("./routes/hospitalRoutes")
const doctorRoutes=require("./routes/doctorRoutes")

const connectDB = require("./config/db")

dotenv.config()

const app=express()

connectDB();

app.use(express.json())

app.use('/api/hospitals',hospitalRoutes)

app.use('/api/doctors',doctorRoutes)

const PORT=process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server listening @ ${PORT}`);
})