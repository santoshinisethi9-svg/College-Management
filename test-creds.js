const mysql = require('mysql2');
const passwords = ['Ankita54321@', 'ankita54321@', 'Ankita@54321', 'root', 'root123', 'admin', 'password', '', '123456'];
const users = ['root', 'admin', 'college', 'ankita', 'Ankita'];

async function test() {
  for (let u of users) {
    for (let p of passwords) {
      await new Promise(r => {
        const c = mysql.createConnection({user:u, password:p});
        c.connect(e => {
          if (!e || e.code !== 'ER_ACCESS_DENIED_ERROR') {
             console.log(`SUCCESS with user=${u} pass=${p} (Error: ${e?e.code:'none'})`);
             if (!e) c.end();
          }
          r();
        });
        c.on('error', () => {});
      });
    }
  }
  console.log('Finished testing.');
}
test();
