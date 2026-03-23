import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { encodeText } from "./tokenizer.js";

const app = express();

// ✅ Middleware
app.use(cors({
  origin: "*" // for now (later restrict if needed)
}));
app.use(bodyParser.json());

// ✅ Routes
app.post("/tokenize", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const result = encodeText(text);
  res.json(result);
});

// ✅ IMPORTANT: dynamic port for deployment
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});