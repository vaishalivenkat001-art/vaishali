
import { GoogleGenAI, Type } from "@google/genai";

// Initialize the Google GenAI SDK using the API_KEY from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a high-quality job description based on title and requirements.
 */
export const generateJobDescription = async (title: string, company: string, requirements: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a high-end job description for a "${title}" at "${company}". Requirements: ${requirements.join(', ')}. Include sections: Role Overview, Key Responsibilities, Benefits. Max 300 words.`,
      config: { temperature: 0.7 }
    });
    return response.text || "Failed to generate description.";
  } catch (error) {
    return "Error generating content.";
  }
};

/**
 * Analyzes and scores a job application using Gemini 3 Pro.
 */
export const scoreApplication = async (resumeText: string, jobDescription: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Act as an expert recruiter. Grade this application based on the job description.
      Resume: ${resumeText}
      Job: ${jobDescription}
      
      Return a match score (0-100) and brief feedback for the employer.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            feedback: { type: Type.STRING },
            missingSkills: { type: Type.ARRAY, items: { type: Type.STRING } }
          },
          required: ["score", "feedback", "missingSkills"]
        }
      }
    });
    const text = response.text || "{}";
    return JSON.parse(text.trim());
  } catch (error) {
    return { score: 50, feedback: "Analysis unavailable.", missingSkills: [] };
  }
};

/**
 * Returns a ranked list of recommended job IDs based on a user profile.
 */
export const getSmartRecommendations = async (userProfile: string, allJobs: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Profile: ${userProfile}\nJobs: ${allJobs}\nRank the top 3 jobs for this user by ID. Return just the IDs as a JSON array.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING }
        }
      }
    });
    const text = response.text || "[]";
    return JSON.parse(text.trim());
  } catch (error) {
    return [];
  }
};

/**
 * Provides encouraging AI insights comparing candidate skills with job requirements.
 */
export const getMatchInsights = async (userSkills: string[], jobRequirements: string[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Candidate skills: ${userSkills.join(', ')}. Job requirements: ${jobRequirements.join(', ')}. Provide a short, encouraging one-sentence insight about the candidate's compatibility.`,
      config: { temperature: 0.5 }
    });
    return response.text?.trim() || "Your profile shows great potential for this role.";
  } catch (error) {
    return "Analyzing your compatibility with this role...";
  }
};
