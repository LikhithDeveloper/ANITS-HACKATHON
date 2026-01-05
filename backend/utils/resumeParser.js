const pdf = require('pdf-parse');
const fs = require('fs');

const parseResume = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    
    // Basic cleaning: remove excessive whitespace
    const text = data.text.replace(/\s+/g, ' ').trim();
    return text;
  } catch (error) {
    console.error("Error parsing resume:", error);
    throw new Error("Failed to parse resume file");
  }
};

module.exports = { parseResume };
