const http = require('http');

const data = JSON.stringify({ email: 'rahul@example.com', password: 'password123' });

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
     const token = JSON.parse(body).token;
     
     // Now hit AI route
     const aiData = JSON.stringify({ currentSkills: ['HTML'] });
     const req2 = http.request({
        hostname: 'localhost',
        port: 5000,
        path: '/api/ai/recommend',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Content-Length': aiData.length
        }
     }, res2 => {
        let b2 = '';
        res2.on('data', d => b2+=d);
        res2.on('end', () => console.log('AI RESPONSE:', b2));
     });
     req2.write(aiData);
     req2.end();
  });
});
req.write(data);
req.end();
