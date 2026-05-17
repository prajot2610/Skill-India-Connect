require('dotenv').config();
const crypto = require('crypto');
global.crypto = crypto;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');
const Course = require('./models/Course');
const Job = require('./models/Job');
const Application = require('./models/Application');

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to Database for seeding...');

    // Check if database already has data
    const userCount = await User.countDocuments();
    if (userCount > 0) {
      console.log('Database already contains users. Skipping seed to preserve existing records.');
      process.exit(0);
    }

    // Clear existing data
    await Course.deleteMany();
    await Job.deleteMany();
    await Application.deleteMany();
    console.log('Cleared existing database records.');

    // 1. Create Users
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    const users = await User.insertMany([
      { name: 'Admin Manager', email: 'admin@skillindia.com', password, role: 'admin', bio: 'Platform Administrator' },
      { name: 'TCS HR', email: 'hr@tcs.com', password, role: 'recruiter', bio: 'Tech Recruiter at TCS India' },
      { name: 'Infosys Talent', email: 'talent@infosys.com', password, role: 'recruiter', bio: 'Hiring Manager at Infosys' },
      { name: 'Rahul Sharma', email: 'rahul@example.com', password, role: 'learner', skills: ['HTML', 'CSS', 'JavaScript', 'React'], bio: 'Frontend Developer looking for opportunities.' },
      { name: 'Priya Patel', email: 'priya@example.com', password, role: 'learner', skills: ['Python', 'Django', 'SQL'], bio: 'Backend Developer passionate about scalable systems.' },
      { name: 'Amit Kumar', email: 'amit@example.com', password, role: 'learner', skills: ['Java', 'Spring Boot', 'AWS'], bio: 'Full-stack enterprise developer.' }
    ]);
    console.log('Mock Users created.');

    const admin = users[0];
    const recruiterTCS = users[1];
    const recruiterInfy = users[2];
    const learnerRahul = users[3];
    const learnerPriya = users[4];

    // 2. Create Courses (by Admin)
    await Course.insertMany([
      { title: 'Advanced Full Stack Web Development', description: 'Master MERN stack with industry-level projects. Includes Next.js, Docker, and AWS deployment.', instructor: 'Hitesh Choudhary', duration: '12 Weeks', category: 'Web Development', price: 2999 },
      { title: 'Python for Data Science and Machine Learning', description: 'Learn Python, Pandas, NumPy, and Scikit-Learn from scratch. Build predictive models.', instructor: 'Krish Naik', duration: '8 Weeks', category: 'Data Science', price: 3499 },
      { title: 'Cloud Computing & DevOps Bootcamp', description: 'Comprehensive guide to AWS, Docker, Kubernetes, and CI/CD pipelines using Jenkins.', instructor: 'Sanjeev Sharma', duration: '10 Weeks', category: 'DevOps', price: 4999 },
      { title: 'UI/UX Design Masterclass', description: 'Figma to Code: Learn modern design principles, glassmorphism, and responsive CSS.', instructor: 'Anjali Desai', duration: '6 Weeks', category: 'Design', price: 1999 }
    ]);
    console.log('Mock Courses created.');

    // 3. Create Jobs
    const jobs = await Job.insertMany([
      { title: 'Frontend React Developer', company: 'Tata Consultancy Services', location: 'Bangalore, Hybrid', description: 'Looking for a skilled frontend developer to build highly responsive user interfaces using React and Redux.', requirements: ['React', 'Redux', 'JavaScript', 'CSS'], postedBy: recruiterTCS._id },
      { title: 'Junior Backend Engineer (Python)', company: 'Tata Consultancy Services', location: 'Pune, On-site', description: 'Join our backend team to develop scalable APIs and microservices using Python and Django.', requirements: ['Python', 'Django', 'PostgreSQL', 'REST APIs'], postedBy: recruiterTCS._id },
      { title: 'Cloud DevOps Engineer', company: 'Infosys', location: 'Hyderabad, Remote', description: 'Seeking a DevOps engineer to manage our AWS infrastructure and automate CI/CD pipelines.', requirements: ['AWS', 'Docker', 'Jenkins', 'Linux'], postedBy: recruiterInfy._id },
      { title: 'Java Spring Boot Developer', company: 'Infosys', location: 'Chennai, Hybrid', description: 'Enterprise software development using Java 17 and Spring Boot for global fintech clients.', requirements: ['Java', 'Spring Boot', 'Microservices', 'SQL'], postedBy: recruiterInfy._id }
    ]);
    console.log('Mock Jobs created.');

    // 4. Create Applications
    await Application.insertMany([
      { job: jobs[0]._id, applicant: learnerRahul._id, coverLetter: 'I have 2 years of experience with React and would love to join TCS.', status: 'reviewed' },
      { job: jobs[1]._id, applicant: learnerPriya._id, coverLetter: 'My background in Python and Django aligns perfectly with this role.', status: 'applied' },
      { job: jobs[2]._id, applicant: learnerRahul._id, coverLetter: 'I am learning DevOps and am eager to apply my knowledge.', status: 'rejected' }
    ]);
    console.log('Mock Applications created.');

    console.log('Database seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('Error with data import', error);
    process.exit(1);
  }
};

seedDatabase();
