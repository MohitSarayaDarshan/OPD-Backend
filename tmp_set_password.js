const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGO_URL);
  const password = 'Test1234!';
  const hashed = await bcrypt.hash(password, 10);
  const result = await User.findOneAndUpdate({ Email: 'smitStaff@gmail.com', Role:'staff' }, { Password: hashed }, { new: true });
  if (!result) {
    console.error('User not found');
    process.exit(1);
  }
  console.log('Updated password for', result.Email);
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
