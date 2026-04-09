const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function resetPassword() {
    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: process.env.NODE_ENV === 'production' ? {
                rejectUnauthorized: false
            } : false
        });

        const hashedPassword = await bcrypt.hash('admin123', 10);
        console.log('New hash for admin123:', hashedPassword);

        const [result] = await connection.execute(
            'UPDATE users SET password = ? WHERE email = ?',
            [hashedPassword, 'admin@college.com']
        );

        if (result.affectedRows > 0) {
            console.log('Admin password reset to "admin123" successfully!');
        } else {
            console.log('Admin user not found. Creating admin user...');
            await connection.execute(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                ['Admin College', 'admin@college.com', hashedPassword, 'college']
            );
            console.log('Admin user created successfully!');
        }
    } catch (err) {
        console.error('Error resetting password:', err.message);
    } finally {
        if (connection) await connection.end();
    }
}

resetPassword();
