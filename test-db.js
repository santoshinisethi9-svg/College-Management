const pool = require('./config/db');

async function testConnection() {
    try {
        console.log('Testing connection using config from .env...');
        console.log('Host:', process.env.DB_HOST);
        console.log('User:', process.env.DB_USER);
        console.log('Database:', process.env.DB_NAME);
        
        const [rows] = await pool.query('SELECT 1 + 1 AS solution');
        console.log('Connection successful! Solution:', rows[0].solution);
        
        // Check if our tables exist
        const [tables] = await pool.query('SHOW TABLES');
        console.log('Tables in database:', tables.map(t => Object.values(t)[0]).join(', ') || 'None');
        
        process.exit(0);
    } catch (err) {
        console.error('Connection failed!');
        console.error('Error Code:', err.code);
        console.error('Message:', err.message);
        process.exit(1);
    }
}

testConnection();
