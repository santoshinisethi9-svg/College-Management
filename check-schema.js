const pool = require('./config/db');

async function checkSchema() {
    try {
        const [usersCols] = await pool.query('DESCRIBE users');
        console.log('--- USERS table ---');
        usersCols.forEach(c => console.log(`${c.Field}: ${c.Type}`));

        const [attendanceCols] = await pool.query('DESCRIBE attendance');
        console.log('\n--- ATTENDANCE table ---');
        attendanceCols.forEach(c => console.log(`${c.Field}: ${c.Type}`));

        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

checkSchema();
