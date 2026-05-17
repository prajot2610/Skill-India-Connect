const express = require('express');
const { applyForJob, getApplicationsForJob, getMyApplications } = require('../controllers/applicationController');
const { protect, authorize } = require('../middleware/auth');
const { check } = require('express-validator');
const validate = require('../middleware/validator');

const router = express.Router();

router.post(
  '/',
  protect,
  authorize('learner'),
  [
    check('jobId', 'Job ID is required').not().isEmpty(),
  ],
  validate,
  applyForJob
);

router.get('/my', protect, authorize('learner'), getMyApplications);
router.get('/job/:jobId', protect, authorize('recruiter', 'admin'), getApplicationsForJob);

module.exports = router;
