const pool = require('./config/db');
const bcrypt = require('bcryptjs');

async function testAddStudent() {
    try {
        const name = 'Test Student';
        const email = 'test@college.com';
        const password = 'student123';
        const roll_number = 'TS001';
        const branch = 'Computer Science';
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        await pool.execute(
            'INSERT INTO users (name, email, password, roll_number, branch, role) VALUES (?, ?, ?, ?, ?, "student")',
            [name, email, hashedPassword, roll_number, branch]
        );
        
        console.log('Student added successfully in test script!');
        process.exit(0);
    } catch (err) {
        console.error('Error adding student:', err.message);
        process.exit(1);
    }
}

testAddStudent();
