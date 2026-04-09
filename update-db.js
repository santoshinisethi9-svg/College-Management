const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function updateDatabase() {
    let connection;
    try {
        console.log('Connecting to MySQL...');
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
            multipleStatements: true
        });

        const updateFile = path.join(__dirname, 'database', 'update_schema.sql');
        const sql = fs.readFileSync(updateFile, 'utf8');

        console.log('Running update_schema.sql...');
        await connection.query(sql);
        console.log('Database updated successfully!');
    } catch (err) {
        console.error('Error updating database:', err.message);
    } finally {
        if (connection) await connection.end();
    }
}

updateDatabase();
