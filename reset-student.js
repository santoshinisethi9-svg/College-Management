const pool = require('./config/db');
const bcrypt = require('bcryptjs');

async function resetStudent() {
    try {
        const hashedPassword = await bcrypt.hash('student123', 10);
        await pool.query('UPDATE users SET password = ? WHERE email = ?', [hashedPassword, 'Ankita@collage.com']);
        console.log('Password reset for Ankita@collage.com');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

resetStudent();
