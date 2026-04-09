const pool = require('./config/db');
const fs = require('fs');

async function checkSchema() {
    try {
        const [rows] = await pool.query('DESCRIBE users');
        fs.writeFileSync('users_schema.json', JSON.stringify(rows, null, 2));
        console.log('Schema saved');
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

checkSchema();
