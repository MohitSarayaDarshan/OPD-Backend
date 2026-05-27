const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function run() {
  await mongoose.connect(process.env.MONGO_URL||'mongodb://hhareshsaraya_db_user:EQ8AfQaYvBirzmwx@ac-fxn7oei-shard-00-00.yic5n42.mongodb.net:27017,ac-fxn7oei-shard-00-01.yic5n42.mongodb.net:27017,ac-fxn7oei-shard-00-02.yic5n42.mongodb.net:27017/?ssl=true&replicaSet=atlas-o9571u-shard-0&authSource=admin&retryWrites=true&w=majority');
  
  // Try finding the user added from register.jsx
  const users = await User.find({});
  console.log("All users:");
  users.forEach(u => console.log(u.Email, u.Role, u.Password));

  process.exit(0);
}

run();
