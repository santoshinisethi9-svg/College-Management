const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initializeDatabase() {
    let connection;
    try {
        console.log('Connecting to MySQL server...');
        
        // Connection config for local or production
        const config = {
            host: process.env.DB_HOST || 'localhost',
            port: parseInt(process.env.DB_PORT) || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            multipleStatements: true,
            ssl: process.env.NODE_ENV === 'production' ? {
                rejectUnauthorized: false
            } : false
        };

        // First connect without specifying database to create it
        connection = await mysql.createConnection(config);
        
        console.log(`Creating database "${process.env.DB_NAME}" if it doesn't exist...`);
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        await connection.query(`USE ${process.env.DB_NAME}`);

        const schemaFile = path.join(__dirname, 'database', 'schema.sql');
        if (!fs.existsSync(schemaFile)) {
            throw new Error(`Schema file not found at ${schemaFile}`);
        }
        
        const sql = fs.readFileSync(schemaFile, 'utf8');

        console.log('Running schema.sql to create tables...');
        await connection.query(sql);
        console.log('Database and tables initialized successfully!');

        // Optional: Run seed data if it exists
        const seedFile = path.join(__dirname, 'seed-mockup.js');
        if (fs.existsSync(seedFile)) {
            console.log('Found seed-mockup.js, you might want to run it next.');
        }

    } catch (err) {
        console.error('Error during database initialization:');
        console.error(err.message);
        if (err.code === 'ER_ACCESS_DENIED_ERROR') {
            console.error('\nTIP: Access denied. Please check your DB_USER and DB_PASSWORD in the .env file.');
        }
    } finally {
        if (connection) await connection.end();
    }
}

initializeDatabase();
