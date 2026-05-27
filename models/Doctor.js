const mongoose = require('mongoose');
const Counter=require('./Counter')
const DoctorSchema = new mongoose.Schema({
  DoctorID: { type: Number, unique: true },
  DoctorName: { type: String, required: true, maxLength: 250 },
  StaffID: [{ type: Number }],
  StudentID: [{ type: Number }],
  HospitalID: { type: Number, required: true, ref: 'Hospital' },
  Description: { type: String, maxLength: 250 },
  UserID: { type: Number, required: true },
  Image:{type:String},
  StartTime:{type:Date},
  SlotsPerDay:{type:Number,default:20},
  AvgTimePerPatient:{type:Number, default:15},
  AppointmentDate:{type:Date},
  CurrentSlot:{type:Number, default:0},
  Experience:{type:Number},
  Rating:{type:Number,min:1,max:5}
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });

DoctorSchema.pre('save',async function(){
  if(!this.isNew) return;

  try{
    const counter=await Counter.findOneAndUpdate({id:'DoctorID'},{$inc:{seq:1}},{new:true,upsert:true})

    this.DoctorID=counter.seq;
    console.log(counter.seq);
    
  }
  catch(error){
    throw error;
  }
});

module.exports = mongoose.model('Doctor', DoctorSchema);