import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { encodeText } from "./tokenizer.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/tokenize", (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const result = encodeText(text);

  res.json(result);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});