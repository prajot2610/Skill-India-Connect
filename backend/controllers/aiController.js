const { GoogleGenerativeAI } = require('@google/generative-ai');

const MOCK_RECOMMENDATION = (skills) =>
  `Based on your skills in ${skills.join(', ')}, here are 3 recommended next steps:\n\n` +
  `1. **React.js** – Build dynamic user interfaces and SPAs.\n` +
  `2. **Node.js & Express** – Develop scalable REST APIs.\n` +
  `3. **Cloud Computing (AWS/GCP)** – Deploy and manage applications at scale.\n\n` +
  `Learning Path: Start with React fundamentals → Build a full-stack project → Deploy to cloud.`;

const getSkillRecommendations = async (req, res) => {
  try {
    const { currentSkills } = req.body;

    if (!currentSkills || currentSkills.length === 0) {
      return res.status(400).json({ message: 'Please provide current skills' });
    }

    // Fall back to mock if no API key configured
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
      return res.json({ recommendation: MOCK_RECOMMENDATION(currentSkills) });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const prompt = `As a career counselor, suggest 3 skills to learn next and a brief learning path based on these current skills: ${currentSkills.join(', ')}. Keep the response under 100 words and format as plain text.`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    res.json({ recommendation: responseText });

  } catch (error) {
    // Gracefully handle quota exceeded (429) — return mock so the UI still works
    if (error.message && (error.message.includes('429') || error.message.includes('quota') || error.message.includes('Too Many Requests'))) {
      console.warn('Gemini API quota exceeded. Returning mock recommendation.');
      return res.json({
        recommendation: MOCK_RECOMMENDATION(req.body.currentSkills || ['your skills']),
        note: 'Live AI temporarily unavailable (quota limit reached). Showing sample recommendation.'
      });
    }

    console.error('AI Error:', error.message);
    res.status(500).json({ message: 'Error getting recommendations: ' + error.message });
  }
};

module.exports = {
  getSkillRecommendations
};
