const mongoose=require('mongoose')
const Counter=require('./Counter')
const { description } = require('../validations/hospitalValidation')

const StaffSchema=new mongoose.Schema({
    StaffID:{type:Number,unique:true},
    StaffName:{type:String,required:true,maxLength:250},
    HospitalID:{type:Number,required:true,ref:'Hospital'},
    UserID:{type:Number,required:true},
    Image:{type:String},
    Description:{type:String},
    Role:{type:String}
},{ timestamps: { createdAt: 'Created', updatedAt: 'Modified' } })


StaffSchema.pre('save',async function(){
    if(!this.isNew)return

    try{
        const counter=await Counter.findOneAndUpdate({id:'StaffID'},{$inc:{seq:1}},{new:true,upsert:true})

        this.StaffID=counter.seq
        console.log(counter.seq)
    }
    catch(error)
    {
        throw error;
    }
})

module.exports=mongoose.model('Staff',StaffSchema)