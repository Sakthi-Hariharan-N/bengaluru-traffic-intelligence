require('dotenv').config();
console.log('KEY LOADED:', process.env.GEMINI_API_KEY);
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getRecommendation(area, rows) {
  const model = genAI.getGenerativeModel({ model: 'gemini-3.5-flash' });

  const summary = rows.slice(0, 5).map(r =>
    `Date: ${r.Date.value}, Congestion: ${r['Congestion Level']}, Speed: ${r['Average Speed']}, Incidents: ${r['Incident Reports']}, Risk: ${r.risk.level}`
  ).join('\n');

  const prompt = `You are a traffic advisor for Bengaluru. Based on this recent traffic data for ${area}:\n${summary}\n\nGive a short 3-sentence recommendation on whether someone should travel now or wait, and why.`;

  try {
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (err) {
    console.error('Gemini attempt 1 failed, retrying...', err.message);
    try {
      await new Promise(r => setTimeout(r, 3000));
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err2) {
      console.error('Gemini retry also failed:', err2.message);
      return `Based on current data, ${area} shows elevated congestion and incident levels — consider delaying travel if possible. (AI service temporarily unavailable, showing fallback advisory.)`;
    }
  }
}

module.exports = { getRecommendation };