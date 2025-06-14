import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const JWT_SECRET =
  process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Demo users for authentication
const DEMO_USERS = [
  { id: "1", email: "demo@creator.com", password: "demo123" },
  { id: "2", email: "user@example.com", password: "password123" },
];

// Load Gemini API key from environment
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/api/generate-content", async (req, res) => {
  const { topic, niche } = req.body;

  if (!topic || !niche) {
    return res.status(400).json({ error: "Topic and niche are required" });
  }

  try {
    const prompt = `
You are a content strategist AI. Generate only one content idea for an Instagram reel.

Topic: ${topic}
Niche: ${niche}

Respond with ONLY valid JSON. Do NOT include any explanation, formatting, or markdown.

Format:
{
  "reelIdea": "Describe the reel idea here",
  "caption": "An engaging caption",
  "hashtags": ["#example1", "#example2", "#example3", "#example4", "#example5","#example6", "#example7", "#example8", "#example9", "#example10"],
  "hook": "A strong hook to start the reel"
}
`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();

    // Sanitize markdown formatting if present
    if (text.startsWith("```")) {
      text = text.replace(/```json|```/g, "").trim();
    }

    const contentIdea = JSON.parse(text);
    // If response is an array, take the first object
    if (Array.isArray(contentIdea)) {
      contentIdea = contentIdea[0];
    }

    res.json(contentIdea);
  } catch (err) {
    console.error("Error generating content:", err.message);
    res.status(500).json({ error: "Failed to generate content idea" });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user in demo users
    const user = DEMO_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
      },
      JWT_SECRET
    );

    return res.json({
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
