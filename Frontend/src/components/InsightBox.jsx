import { motion, AnimatePresence } from "framer-motion";
import { 
  Zap, Lightbulb, Globe, AlertCircle, 
  Code, Link, Repeat, Layers, Construction 
} from "lucide-react";

export default function InsightBox({ text, count }) {
  let insights = [];
  if (/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u.test(text)) {
  insights.push({ 
    text: "Emoji detected → These often consume 2-4 tokens each.", 
    icon: <Zap size={16} className="text-yellow-400" /> 
  });
}

// 2. Code/Syntax Detection
if (/[{}()\[\];=<>#]/.test(text) || /\b(def|function|const|let|if|for|while|import|export)\b/.test(text)) {
  insights.push({ 
    text: "Code-like syntax → Symbols like { } ( ) are usually individual tokens.", 
    icon: <Code size={16} className="text-blue-400" /> 
  });
}

// 3. Non-ASCII / Multilingual
if (/[^\x00-\x7F]/.test(text)) {
  insights.push({ 
    text: "Non-ASCII script → Non-Latin languages are significantly more 'expensive'.", 
    icon: <Globe size={16} className="text-emerald-400" /> 
  });
}

// 4. URL/Web Structure
if (/https?:\/\/\S+|www\.\S+/.test(text)) {
  insights.push({ 
    text: "URL detected → Slashes, dots, and protocols break into many small tokens.", 
    icon: <Link size={16} className="text-indigo-400" /> 
  });
}

// 5. Long Word Splitting (Agglutination)
if (/\b\w{12,}\b/.test(text)) {
  insights.push({ 
    text: "Long word detected → Likely broken into sub-word chunks (BPE).", 
    icon: <Layers size={16} className="text-purple-400" /> 
  });
}

// 6. Repetitive Patterns
if (/(.)\1{4,}/.test(text)) {
  insights.push({ 
    text: "Repetitive patterns → BPE is very efficient at compressing these.", 
    icon: <Repeat size={16} className="text-pink-400" /> 
  });
}

// 7. Critical Density Check
if (count > text.length && text.length > 0) {
  insights.push({ 
    text: "Inefficiency Warning: More tokens than characters! Very high cost.", 
    icon: <AlertCircle size={16} className="text-red-500" /> 
  });
}

// 8. Standard English (Only if no other high-complexity flags are present)
if (insights.length === 0 && /[a-zA-Z]+ [a-zA-Z]+/.test(text)) {
  insights.push({ 
    text: "Standard English structure → Tokenized at ~0.75 tokens per word.", 
    icon: <Lightbulb size={16} className="text-gray-400" /> 
  });
}

  return (
    <motion.div 
      layout
      className="mt-6 bg-gray-900/80 p-6 rounded-2xl border border-gray-800 shadow-xl"
    >
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-yellow-400">
        <Lightbulb /> Intelligence Insights
      </h2>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {insights.length === 0 ? (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-gray-500 italic">
              Awaiting data for analysis...
            </motion.p>
          ) : (
            insights.map((insight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-200 text-sm"
              >
                {insight.icon}
                {insight.text}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}