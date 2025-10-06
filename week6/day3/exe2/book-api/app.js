import express from 'express';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';
import { initTable } from './models/bookModel.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await initTable(); // Create table if not exists
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
