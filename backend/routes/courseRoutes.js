const express = require('express');
const { getCourses, getCourseById, createCourse, enrollCourse, getMyCourses } = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');
const { check } = require('express-validator');
const validate = require('../middleware/validator');

const router = express.Router();

router.get('/', getCourses);
router.get('/my/enrolled', protect, authorize('learner'), getMyCourses);
router.get('/:id', getCourseById);
router.post('/:id/enroll', protect, authorize('learner'), enrollCourse);

router.post(
  '/',
  protect,
  authorize('admin'), // Only admin can create courses
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
  ],
  validate,
  createCourse
);

module.exports = router;
