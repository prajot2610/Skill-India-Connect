const express = require('express');
const { getSkillRecommendations } = require('../controllers/aiController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.post('/recommend', protect, getSkillRecommendations);

module.exports = router;
