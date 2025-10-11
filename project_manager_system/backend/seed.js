require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Mongo connected');

    const existing = await User.findOne({ email: 'employer@example.com' });
    if (existing) {
      console.log('⚠️ Employer already exists');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('password123', 10);

    const employer = new User({
      name: 'Default Employer',
      email: 'employer@example.com',
      password: hashedPassword, // ✅ store hashed password
      role: 'employer'
    });

    await employer.save();
    console.log('✅ Seeded employer: employer@example.com / password123');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

seed();
