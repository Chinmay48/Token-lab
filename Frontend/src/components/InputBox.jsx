import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Terminal, Type } from "lucide-react";

export default function InputBox({ onAnalyze }) {
  const [input, setInput] = useState("");

  const examples = [
  // 1. Classic & Standard
  "I love programming",
  
  // 2. Emoji & Visual Complexity (Tests multi-byte handling)
  "I ❤️ programming 🚀✨",
  
  // 3. Mixed Language / Hinglish (Tests non-English token density)
  "Mujhe coding pasand hai 😄",
  
  // 4. Compact Code (Tests symbol handling)
  "for(int i=0;i<10;i++)",
  
  // 5. Python Logic (Tests indentation/whitespace importance)
  "def greet(): print('Hello World')",
  
  // 6. Non-Latin Script (Tests high token-to-char ratio)
  "नमस्ते दुनिया", // "Hello World" in Hindi
  
  // 7. Extreme Punctuation/Regex (Tests symbol splitting)
  "/^[a-zA-Z0-9+_.-]+@/",
  
  // 8. Long "Agglutinative" Words (Tests sub-word splitting)
  "Antidisestablishmentarianism",
  
  // 9. Repetitive Patterns (Tests BPE efficiency)
  "hahahahahahahahaha",
  
  // 10. URLs (Tests how delimiters like dots and slashes are treated)
  "https://github.com/openai/tiktoken"
];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-900/50 backdrop-blur-xl p-6 rounded-2xl border border-gray-800 shadow-2xl"
    >
      <div className="flex items-center gap-2 mb-4 text-gray-400">
        <Terminal size={18} />
        <span className="text-sm font-medium uppercase tracking-wider">Input Stream</span>
      </div>

      <textarea
        className="w-full p-4 rounded-xl bg-gray-950 text-white border border-gray-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all outline-none resize-none"
        rows="4"
        placeholder="Paste your text or code here..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-2 mt-4 flex-wrap">
        {examples.map((ex, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setInput(ex);
              onAnalyze(ex);
            }}
            className="bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-lg text-xs text-gray-300 border border-gray-700 transition-colors"
          >
            {ex.slice(0, 15)}...
          </motion.button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onAnalyze(input)}
        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
      >
        <Sparkles size={18} />
        Analyze Tokens
      </motion.button>
    </motion.div>
  );
}