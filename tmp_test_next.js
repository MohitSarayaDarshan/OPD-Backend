const fetch = global.fetch || require('node-fetch');

async function run() {
  const loginRes = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ Email: 'smitStaff@gmail.com', Password: 'Test1234!', Role: 'staff' })
  });
  const loginText = await loginRes.text();
  console.log('login', loginRes.status, loginText);

  if (loginRes.status !== 201) {
    throw new Error('Login failed');
  }

  const cookie = loginRes.headers.get('set-cookie');
  if (!cookie) {
    throw new Error('No auth cookie returned');
  }

  const statusRes = await fetch('http://localhost:3000/api/appointments/status/5', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie
    },
    body: JSON.stringify({ Status: 'Confirmed' })
  });
  console.log('status', statusRes.status, await statusRes.text());

  const nextRes = await fetch('http://localhost:3000/api/appointments/next', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Cookie: cookie
    },
    body: JSON.stringify({ Email: 'smitStaff@gmail.com', DoctorID: 11 })
  });
  console.log('next', nextRes.status, await nextRes.text());
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
