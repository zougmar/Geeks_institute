require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function run() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const users = await User.find();
    console.log('All users in the database:');
    users.forEach(user => {
      console.log(`${user.name} - ${user.email} - ${user.role}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
