import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/chat", async (req, res) => {
  const { message } = req.body;
  const modelUrl = "https://router.huggingface.co/v1/chat/completions";
  const modelId = "deepseek-ai/DeepSeek-V3.2-Exp:novita";
  const systemPrompt =
    "You are a helpful Shopping assistant that helps users find the best items for their use and suggest products according to their needs.";
  const maxRetries = 3;

  if (!process.env.HF_API_KEY) {
    console.error("HF_API_KEY not set in environment variables.");
    return res.status(500).json({ error: "Server misconfiguration: API key missing." });
  }

  const requestBody = {
    model: modelId,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    options: { wait_for_model: true },
  };

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(modelUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => ({ error: "Unknown API error" }));
        if (response.status === 404 || response.status === 400) {
          return res.status(response.status).json(errorBody);
        }
        throw new Error(
          `API failed with status ${response.status}: ${JSON.stringify(errorBody)}`
        );
      }

      const data = await response.json();
      const reply =
        data.choices?.[0]?.message?.content ||
        "No valid response structure received from the model.";

      return res.json({ reply });
    } catch (err) {
      console.error(`Attempt ${attempt + 1} failed:`, err.message);
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        return res.status(500).json({
          error: "Could not get a response from the LLM service after multiple attempts.",
        });
      }
    }
  }
});

export default router;
