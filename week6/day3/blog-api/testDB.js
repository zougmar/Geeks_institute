import pool from './config/db.js';

const testDB = async () => {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connection OK:', res.rows[0]);
    } catch (err) {
        console.error('Database connection error:', err);
    } finally {
        pool.end();
    }
};

testDB();
