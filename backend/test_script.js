const http = require('http');

const API_URL = 'http://localhost:5000/api';

async function request(endpoint, method = 'GET', body = null, token = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + endpoint);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch(e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('--- STARTING DEEP CHECK ---');

  // 1. Register Users
  const adminRes = await request('/auth/register', 'POST', { name: 'Admin', email: 'admin@test.com', password: 'password', role: 'admin' });
  console.log('Admin Register:', adminRes.status);
  const adminToken = adminRes.body.token;

  const recRes = await request('/auth/register', 'POST', { name: 'Recruiter', email: 'rec@test.com', password: 'password', role: 'recruiter' });
  console.log('Recruiter Register:', recRes.status);
  const recToken = recRes.body.token;

  const learnerRes = await request('/auth/register', 'POST', { name: 'Learner', email: 'learner@test.com', password: 'password', role: 'learner' });
  console.log('Learner Register:', learnerRes.status);
  const learnerToken = learnerRes.body.token;
  const learnerId = learnerRes.body._id;

  // 2. Test Admin Creating Course
  const courseRes = await request('/courses', 'POST', {
    title: 'Advanced Web Dev',
    description: 'Learn Node, React, Mongo',
    instructor: 'John Doe',
    duration: '4 Weeks',
    category: 'Development',
    price: 1000
  }, adminToken);
  console.log('Admin Create Course:', courseRes.status);

  // 3. Test Learner Viewing Courses
  const getCoursesRes = await request('/courses', 'GET');
  console.log('Get Courses (Public):', getCoursesRes.status, getCoursesRes.body.length > 0 ? 'Success' : 'Empty');

  // 4. Test Recruiter Posting Job
  const jobRes = await request('/jobs', 'POST', {
    title: 'Software Engineer',
    company: 'TechCorp',
    location: 'Remote',
    description: 'Build APIs.',
    requirements: ['Node.js']
  }, recToken);
  console.log('Recruiter Post Job:', jobRes.status);
  const jobId = jobRes.body._id;

  // 5. Test Learner Viewing Jobs
  const getJobsRes = await request('/jobs', 'GET');
  console.log('Get Jobs (Public):', getJobsRes.status, getJobsRes.body.length > 0 ? 'Success' : 'Empty');

  // 6. Test Learner Applying to Job
  if (jobId) {
    const applyRes = await request('/applications', 'POST', {
      jobId: jobId,
      coverLetter: 'I am a great fit.'
    }, learnerToken);
    console.log('Learner Apply Job:', applyRes.status);

    // 7. Test Recruiter Viewing Applications
    const recAppsRes = await request(`/applications/job/${jobId}`, 'GET', null, recToken);
    console.log('Recruiter View Applications:', recAppsRes.status, recAppsRes.body.length > 0 ? 'Success' : 'Empty');

    // 8. Test Learner Viewing Own Applications
    const myAppsRes = await request(`/applications/my`, 'GET', null, learnerToken);
    console.log('Learner View Own Applications:', myAppsRes.status, myAppsRes.body.length > 0 ? 'Success' : 'Empty');
  } else {
    console.log('Job Creation Failed, skipping application tests.');
  }

  // 9. Test AI Recommendations
  const aiRes = await request('/ai/recommend', 'POST', { currentSkills: ['HTML', 'CSS'] }, learnerToken);
  console.log('AI Recommendation:', aiRes.status, aiRes.body.recommendation ? 'Success' : 'Failed');

  console.log('--- CHECK COMPLETE ---');
}

runTests();
