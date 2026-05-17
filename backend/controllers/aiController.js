const OpenAI = require('openai');

const getSkillRecommendations = async (req, res) => {
  try {
    const { currentSkills } = req.body;

    if (!currentSkills || currentSkills.length === 0) {
      return res.status(400).json({ message: 'Please provide current skills' });
    }

    // Only instantiate OpenAI if key is present to prevent crashes if user hasn't set it yet.
    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'your_openai_api_key_here') {
       // Mock response for academic/demo purposes if key is missing
       return res.json({
         recommendation: "Since no OpenAI key is configured, here is a mock recommendation: Based on your skills in " + currentSkills.join(", ") + ", we suggest learning React, Node.js, and Cloud Computing. Learning Path: 1. Build a basic frontend. 2. Create REST APIs. 3. Deploy to AWS."
       });
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `As a career counselor, suggest 3 skills to learn next and a brief learning path based on these current skills: ${currentSkills.join(', ')}. Keep the response under 100 words and format as plain text.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    res.json({
      recommendation: response.choices[0].message.content,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error getting recommendations: ' + error.message });
  }
};

module.exports = {
  getSkillRecommendations
};
