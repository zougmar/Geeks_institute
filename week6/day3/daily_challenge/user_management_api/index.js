import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import './config/db.js';

import authRoutes from './routes/auth.js';
import usersRoutes from './routes/users.js';

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => res.send('✅ User Management API Running'));

app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
