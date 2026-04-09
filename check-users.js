const pool = require('./config/db');

async function checkData() {
    try {
        const [users] = await pool.query('SELECT id, name, email, role FROM users');
        console.log('Users in database:', users);
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

checkData();
