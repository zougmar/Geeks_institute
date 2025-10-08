import express from 'express';
import cors from 'cors';
import sequelize from './config/db.js';
import todoRoutes from './routes/todoRoutes.js';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Test route
app.get('/', (req, res) => {
  res.send('Todo API is running!');
});

// Sync database and start server
try {
  await sequelize.sync();
  console.log('✅ Database connected and synced');
  app.listen(3000, () => console.log('Server running on port 3000'));
} catch (err) {
  console.error('Unable to connect to the database:', err);
}
