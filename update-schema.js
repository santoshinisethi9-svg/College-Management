const pool = require('./config/db');

async function updateSchema() {
    try {
        console.log('Adding missing columns to users table...');
        await pool.query('ALTER TABLE users ADD COLUMN phone_number VARCHAR(15)');
        await pool.query('ALTER TABLE users ADD COLUMN parent_contact VARCHAR(15)');
        await pool.query('ALTER TABLE users ADD COLUMN profile_photo VARCHAR(255)');
        console.log('Columns added successfully.');
        process.exit(0);
    } catch (err) {
        console.error('Error updating schema:', err.message);
        process.exit(1);
    }
}

updateSchema();
