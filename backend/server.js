require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

app.use(cors());
app.use(express.json());

/* ── Gemini AI Setup ─────────────────────────────────── */
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

const SYSTEM_INSTRUCTION = `You are EventMind AI, a friendly and knowledgeable event management assistant.
Your expertise covers:
- Planning events (weddings, conferences, birthdays, corporate events, etc.)
- Venue selection and logistics
- Budget planning and cost estimation
- Guest list management and invitations
- Catering, decoration, and entertainment suggestions
- Timeline and schedule creation
- Vendor coordination
- Troubleshooting common event issues

Guidelines:
- Be concise but thorough. Use bullet points and structured formatting when helpful.
- If a question is NOT related to events or event management, politely redirect the user back to event-related topics.
- Always be encouraging and professional.
- When suggesting ideas, provide 2-3 options at different price/effort levels when appropriate.`;

/* ── Routes ──────────────────────────────────────────── */
app.get("/", (req, res) => {
  res.send("MERN Backend Running");
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "your_api_key_here") {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please add your key to backend/.env",
      });
    }

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "Messages array is required." });
    }

    // Map our messages to Gemini's content format
    const contents = messages.map((msg) => ({
      role: msg.role === "ai" ? "model" : "user",
      parts: [{ text: msg.text }],
    }));

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_INSTRUCTION,
    });

    const chat = model.startChat({ history: contents.slice(0, -1) });
    const lastMessage = contents[contents.length - 1];

    const result = await chat.sendMessage(lastMessage.parts[0].text);
    const reply = result.response.text();

    res.json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err);
    res.status(500).json({
      error: "Failed to get a response from EventMind AI. Please try again.",
    });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});