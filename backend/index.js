const express = require('express');
const cors = require('cors');
const OpenAI = require("openai");
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});


app.post('/summarize', async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: "Text Required" })
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You are an AI assistant that summarizes text." },
                { role: "user", content: text }
            ]
        });
        const summary = response.choices[0].message.content;
        res.json({ summary })
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI summarization failed" });
    }
});

app.listen(5000, () => console.log("Backend running on port 5000"));