import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRightLeft, Check, Info } from "lucide-react";

export default function ComparisonMode() {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [dataA, setDataA] = useState(null);
  const [dataB, setDataB] = useState(null);
  const [loading, setLoading] = useState(false);

 const analyzeBoth = async () => {
    if (!textA || !textB) return;

    setLoading(true);

    try {
      const [resA, resB] = await Promise.all([
        fetch("http://localhost:5000/tokenize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: textA }),
        }),
        fetch("http://localhost:5000/tokenize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: textB }),
        }),
      ]);

      const a = await resA.json();
      const b = await resB.json();

      setDataA(a);
      setDataB(b);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  const getRatio = (count, text) =>
    text.length ? (count / text.length).toFixed(2) : 0;

  const getInsight = () => {
    if (!dataA || !dataB) return "";

    if (dataA.tokenCount < dataB.tokenCount) {
      return "Input A is more efficient (fewer tokens).";
    } else if (dataA.tokenCount > dataB.tokenCount) {
      return "Input B is more efficient (fewer tokens).";
    } else {
      return "Both inputs have similar efficiency.";
    }
  };
  return (
    <div className="mt-12 max-w-6xl mx-auto px-4">
      <div className="flex items-center justify-center gap-3 mb-8">
        <ArrowRightLeft className="text-purple-500" />
        <h2 className="text-3xl font-black tracking-tight">Efficiency Duel</h2>
      </div>

      <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
        <textarea
          value={textA}
          onChange={(e) => setTextA(e.target.value)}
          placeholder="Version A..."
          className="p-4 bg-gray-900 border border-gray-800 rounded-2xl focus:ring-2 ring-purple-500 outline-none transition-all h-32"
        />
        
        <div className="bg-gray-800 p-2 rounded-full font-bold text-xs text-gray-500">VS</div>

        <textarea
          value={textB}
          onChange={(e) => setTextB(e.target.value)}
          placeholder="Version B..."
          className="p-4 bg-gray-900 border border-gray-800 rounded-2xl focus:ring-2 ring-purple-500 outline-none transition-all h-32"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={analyzeBoth}
        className="mt-6 w-full bg-purple-600 hover:bg-purple-500 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-900/30 transition-all"
      >
        Run Comparison
      </motion.button>

      {dataA && dataB && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-10 grid md:grid-cols-2 gap-8"
        >
          <div className={`p-6 rounded-2xl border-2 transition-all ${dataA.tokenCount <= dataB.tokenCount ? 'border-green-500/50 bg-green-500/5' : 'border-gray-800 bg-gray-900'}`}>
             <div className="flex justify-between items-start">
               <h3 className="text-lg font-bold mb-4">Input A</h3>
               {dataA.tokenCount <= dataB.tokenCount && <Check className="text-green-500" />}
             </div>
             <div className="text-3xl font-mono font-black">{dataA.tokenCount} <span className="text-sm font-normal text-gray-500">Tokens</span></div>
             <div className="text-sm text-gray-400 mt-2">Cost Ratio: {(dataA.tokenCount / textA.length).toFixed(2)}</div>
          </div>

          <div className={`p-6 rounded-2xl border-2 transition-all ${dataB.tokenCount <= dataA.tokenCount ? 'border-green-500/50 bg-green-500/5' : 'border-gray-800 bg-gray-900'}`}>
             <div className="flex justify-between items-start">
               <h3 className="text-lg font-bold mb-4">Input B</h3>
               {dataB.tokenCount <= dataA.tokenCount && <Check className="text-green-500" />}
             </div>
             <div className="text-3xl font-mono font-black">{dataB.tokenCount} <span className="text-sm font-normal text-gray-500">Tokens</span></div>
             <div className="text-sm text-gray-400 mt-2">Cost Ratio: {(dataB.tokenCount / textB.length).toFixed(2)}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
}