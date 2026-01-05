const { GoogleGenerativeAI } = require("@google/generative-ai");
const { parseResume } = require("../utils/resumeParser");
const fs = require('fs');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeResume = async (req, res) => {
  try {
    if (!req.file || !req.body.jobDescription) {
      return res.status(400).json({ message: "Resume and Job Description are required." });
    }

    const resumePath = req.file.path;
    const jobDescription = req.body.jobDescription;

    // 1. Parse Resume Text
    const resumeText = await parseResume(resumePath);

    // 2. Prepare AI Prompt
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Act as an expert Technical Recruiter and Career Coach. 
      Compare the following Candidate Resume against the Job Description (JD).
      
      Job Description:
      "${jobDescription}"

      Candidate Resume:
      "${resumeText}"

      Output a strictly formatted JSON object with the following structure (no markdown code blocks, just raw JSON):
      {
        "matchScore": <number 0-100>,
        "matchStatus": <"Strong Match" | "Good Match" | "Weak Match">,
        "summary": "<2 sentence summary of fit>",
        "missingSkills": {
          "critical": ["<skill1>", "<skill2>"],
          "optional": ["<skill1>"]
        },
        "resumeImprovements": [
          "<specific actionable tip to improve the resume for this role>"
        ],
        "learningPlan": [
          {
            "week": 1,
            "focus": "<topic>",
            "action": "<what to learn/build>"
          },
             {
            "week": 2,
            "focus": "<topic>",
            "action": "<what to learn/build>"
          },
             {
            "week": 3,
            "focus": "<topic>",
            "action": "<what to learn/build>"
          },
             {
            "week": 4,
            "focus": "<topic>",
            "action": "<what to learn/build>"
          }
        ]
      }
    `;

    // 3. Generate Analysis
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean up JSON string if it contains markdown formatting
    const cleanedText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const analysisData = JSON.parse(cleanedText);

    // Clean up uploaded file
    fs.unlinkSync(resumePath);

    res.json({ success: true, analysis: analysisData });

  } catch (error) {
    console.error("Screening Error:", error);
    // Determine if it's an API Key error
    if (error.message.includes("API key")) {
        return res.status(500).json({ message: "Gemini API Key missing or invalid." });
    }
    res.status(500).json({ message: "Failed to analyze resume.", error: error.message });
  }
};

module.exports = { analyzeResume };
