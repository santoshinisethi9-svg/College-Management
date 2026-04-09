const pool = require('./config/db');
const fs = require('fs');

async function checkStudents() {
    try {
        const [students] = await pool.query('SELECT * FROM users WHERE role = "student"');
        fs.writeFileSync('student_info.json', JSON.stringify(students, null, 2), 'utf8');
        console.log('Done');
        process.exit(0);
    } catch (err) {
        console.error('Error:', err.message);
        process.exit(1);
    }
}

checkStudents();
