const mongoose = require('mongoose');
const bcrypt=require('bcrypt');
const Counter=require('./Counter')
const UserSchema = new mongoose.Schema({
  UserID: { type: Number, unique: true },
  Email:{type:String,unique:true,required:true},
  Password:{type:String,required:true},
  Role:{
    type:String,
    enum:['admin','staff','patient'],
    required:true
  }
}, { timestamps: { createdAt: 'Created', updatedAt: 'Modified' } });


UserSchema.pre('save',async function(){
  if(!this.isNew) return;
  if(!this.isModified('Password')) return;

  try{
    const counter=await Counter.findOneAndUpdate({id:'UserID'},{$inc:{seq:1}},{new:true,upsert:true})

    this.UserID=counter.seq;
    console.log(counter.seq);

    const salt=await bcrypt.genSalt(10)

    this.Password=await bcrypt.hash(this.Password,salt)
    
  }
  catch(error){
    throw error;
  }
});

module.exports = mongoose.model('User', UserSchema);