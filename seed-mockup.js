const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ssl: process.env.NODE_ENV === 'production' ? {
                rejectUnauthorized: false
            } : false
        });

        console.log('Inserting mockup data for verification...');

        // Get student ID
        const [students] = await connection.query('SELECT id FROM users WHERE role = "student" LIMIT 1');
        if (students.length === 0) {
            console.log('No students found. Run database init first.');
            process.exit(1);
        }
        const sid = students[0].id;

        // Add fee if none
        const [fees] = await connection.query('SELECT * FROM fees WHERE student_id = ?', [sid]);
        if (fees.length === 0) {
            await connection.query('INSERT INTO fees (student_id, amount, status, due_date) VALUES (?, ?, ?, CURDATE())', [sid, 5000, 'Pending']);
        }

        // Add complaint if none
        const [complaints] = await connection.query('SELECT * FROM complaints WHERE student_id = ?', [sid]);
        if (complaints.length === 0) {
            await connection.query('INSERT INTO complaints (student_id, message, status) VALUES (?, ?, ?)', [sid, 'Filing for a new library card.', 'Pending']);
        }

        // Add mark if none
        const [marks] = await connection.query('SELECT * FROM results WHERE student_id = ?', [sid]);
        if (marks.length === 0) {
            await connection.query('INSERT INTO results (student_id, subject, marks, total_marks, semester, exam_type) VALUES (?, ?, ?, ?, ?, ?)', [sid, 'Computer Networks', 85, 100, 5, 'MSE']);
        }

        console.log('Mockup data inserted.');
        await connection.end();
    } catch (e) {
        console.log('Error: ' + e.message);
    }
})();
