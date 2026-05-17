const Application = require('../models/Application');
const Job = require('../models/Job');
const { pool } = require('../config/pg');

// @desc    Apply for a job
// @route   POST /api/applications
// @access  Private/Learner
const applyForJob = async (req, res) => {
  try {
    const { jobId, coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    const applicationExists = await Application.findOne({ job: jobId, applicant: req.user._id });
    if (applicationExists) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    const application = new Application({
      job: jobId,
      applicant: req.user._id,
      coverLetter
    });

    const createdApplication = await application.save();

    // -- POSTGRESQL LOGGING --
    try {
      await pool.query(
        'INSERT INTO reports (action, details) VALUES ($1, $2)',
        ['JOB_APPLIED', `User ${req.user._id} applied for Job ${jobId}`]
      );
    } catch (pgError) {
      console.error('Postgres logging failed', pgError);
    }

    res.status(201).json(createdApplication);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get applications for a job (Recruiter view)
// @route   GET /api/applications/job/:jobId
// @access  Private/Recruiter
const getApplicationsForJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Verify recruiter posted this job
    if (job.postedBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view these applications' });
    }

    const applications = await Application.find({ job: req.params.jobId })
      .populate('applicant', 'name email skills');
      
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's own applications
// @route   GET /api/applications/my
// @access  Private/Learner
const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({ applicant: req.user._id })
      .populate('job', 'title company');
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  applyForJob,
  getApplicationsForJob,
  getMyApplications
};
