const fetch = global.fetch || require('node-fetch');

const emails = ['smitStaff@gmail.com', 'mohitSuri@gmail.com', 'anitPadda@gmail.com'];
const passwords = ['password', '123456', 'password123', 'admin123', 'qwerty', 'letmein', 'staff123'];

async function run() {
  for (const email of emails) {
    for (const password of passwords) {
      const body = { Email: email, Password: password, Role: 'staff' };
      const res = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const text = await res.text();
      if (res.status === 201) {
        console.log('SUCCESS', email, password, text);
        return;
      }
      console.log('FAIL', email, password, res.status, text);
    }
  }
  console.log('No password match found');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
