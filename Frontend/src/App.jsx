import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Rocket, 
  Loader2, 
  Coins, 
  Activity, 
  BarChart3, 
  Info, 
  Sparkles 
} from "lucide-react";

import InputBox from "./components/InputBox";
import TokenDisplay from "./components/TokenDisplay";
import InsightBox from "./components/InsightBox";
import ComparisonMode from "./components/ComparisonMode";

export default function App() {
  const [tokens, setTokens] = useState([]);
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [tokenIds, setTokenIds] = useState([]);

  const analyzeText = async (inputText) => {
    if (!inputText) return;
    setLoading(true);
    setText(inputText);

    try {
      const res = await fetch("https://token-lab-zj0j.onrender.com/tokenize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText }),
      });
      const data = await res.json();
      setTokens(data.tokens || []);
      setTokenIds(data.tokenIds || []);
      setCount(data.tokenCount || 0);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const cost = (count / 1000) * 0.002;
  const charLength = text.length || 1;
  const ratio = count / charLength;

  const getEfficiency = () => {
    if (ratio < 0.3) return { label: "Optimized", color: "text-green-400", bg: "bg-green-400/10" };
    if (ratio < 0.6) return { label: "Moderate", color: "text-yellow-400", bg: "bg-yellow-400/10" };
    return { label: "High Density", color: "text-red-400", bg: "bg-red-400/10" };
  };

  const efficiency = getEfficiency();

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 selection:bg-blue-500/30 selection:text-blue-200 p-4 md:p-8 font-sans">
      
      {/* --- Header Section --- */}
      <header className="max-w-4xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center justify-center p-3 bg-blue-600/10 rounded-full mb-4 border border-blue-500/20"
        >
          <Rocket className="text-blue-500" size={28} />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tight"
        >
          Token Insight Lab
        </motion.h1>
        <p className="text-gray-500 mt-2 text-lg">Decode how language models process your strings.</p>
      </header>

      <main className="max-w-4xl mx-auto">
        <InputBox onAnalyze={analyzeText} />

        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div 
              key="loader"
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-20 space-y-4"
            >
              <Loader2 className="animate-spin text-blue-500" size={40} />
              <p className="text-blue-400 font-medium animate-pulse">Neural Tokenization in progress...</p>
            </motion.div>
          ) : tokens.length > 0 ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-12 space-y-8"
            >
              <TokenDisplay tokens={tokens} tokenIds={tokenIds} count={count} />

              {/* --- Metrics Grid --- */}
              <div className="grid md:grid-cols-3 gap-4">
                <MetricCard 
                  icon={<Coins className="text-emerald-400" />} 
                  title="Estimated Cost" 
                  value={`$${cost.toFixed(6)}`} 
                  sub="Based on GPT-3.5 rates"
                />
                <MetricCard 
                  icon={<Activity className={efficiency.color} />} 
                  title="Efficiency" 
                  value={efficiency.label} 
                  sub={`Ratio: ${ratio.toFixed(2)}`}
                  badgeClass={efficiency.bg}
                />
                <MetricCard 
                  icon={<BarChart3 className="text-blue-400" />} 
                  title="Data Weight" 
                  value={`${charLength} Chars`} 
                  sub={`${(count/charLength).toFixed(1)} tokens/char`}
                />
              </div>

              <InsightBox text={text} count={count} />
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="mt-20 border-t border-gray-900 pt-10">
          <ComparisonMode />
        </div>
      </main>

      <footer className="text-center py-12 text-gray-600 text-sm flex items-center justify-center gap-2">
        <Sparkles size={14} /> Built for Token Exploration • 2026
      </footer>
    </div>
  );
}

/* --- Helper Mini-Component for Metrics --- */
function MetricCard({ icon, title, value, sub, badgeClass = "bg-gray-800" }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-gray-900/40 border border-gray-800 p-5 rounded-2xl backdrop-blur-sm"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${badgeClass}`}>
          {icon}
        </div>
        <span className="text-gray-400 text-sm font-medium">{title}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      <div className="text-xs text-gray-500 mt-1 flex items-center gap-1">
        <Info size={12} /> {sub}
      </div>
    </motion.div>
  );
}