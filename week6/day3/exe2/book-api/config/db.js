// config/db.js
import pkg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'Omar1234',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'bookdb'
});

pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL Database'))
  .catch(err => console.error('❌ Database connection error:', err.message));

export default pool;
