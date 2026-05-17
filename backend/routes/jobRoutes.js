const express = require('express');
const { getJobs, getJobById, createJob } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');
const { check } = require('express-validator');
const validate = require('../middleware/validator');

const router = express.Router();

router.get('/', getJobs);
router.get('/:id', getJobById);

router.post(
  '/',
  protect,
  authorize('recruiter', 'admin'), // Recruiter or Admin can post jobs
  [
    check('title', 'Title is required').not().isEmpty(),
    check('company', 'Company is required').not().isEmpty(),
    check('location', 'Location is required').not().isEmpty(),
  ],
  validate,
  createJob
);

module.exports = router;
