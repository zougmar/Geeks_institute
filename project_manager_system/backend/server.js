require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Routes
const authRoutes = require('./routes/auth');
const employerRoutes = require('./routes/employer');
const managerRoutes = require('./routes/manager');

// Middleware
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// ✅ Middleware setup
app.use(cors({
  origin: 'http://localhost:3000', // change if your frontend runs on another port
  credentials: true,
}));
app.use(express.json());

// ✅ Routes
app.use('/api/auth', authRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/managers', managerRoutes);

// ✅ Error handling middleware
app.use(errorHandler);

// ✅ Database connection
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Mongo connected');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Mongo connection error:', err);
    process.exit(1);
  });
