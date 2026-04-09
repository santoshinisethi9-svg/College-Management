const mysql = require('mysql2/promise');
require('dotenv').config();
(async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
        });
        const [rows] = await connection.query('SELECT name, email, roll_number FROM users WHERE role = "student" LIMIT 1');
        console.log(JSON.stringify(rows));
        await connection.end();
    } catch (e) {
        console.log(e.message);
    }
})();
