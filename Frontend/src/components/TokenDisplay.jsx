import { motion } from "framer-motion";
import { Cpu, Hash } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
};

export default function TokenDisplay({ tokens, tokenIds, count }) {
  const colors = [
    "border-purple-500/50 bg-purple-500/10 text-purple-200",
    "border-blue-500/50 bg-blue-500/10 text-blue-200",
    "border-emerald-500/50 bg-emerald-500/10 text-emerald-200",
    "border-pink-500/50 bg-pink-500/10 text-pink-200",
    "border-amber-500/50 bg-amber-500/10 text-amber-200",
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="mt-6 bg-gray-950 p-6 rounded-2xl border border-gray-800"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <Cpu className="text-blue-400" /> Token Breakdown
        </h2>
        <div className="px-4 py-1 bg-blue-600/20 border border-blue-500/30 rounded-full text-blue-400 text-sm font-mono">
          Total: {count}
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {tokens?.map((token, i) => (
          <motion.div
            key={i}
            variants={item}
            whileHover={{ y: -3 }}
            className={`px-3 py-2 rounded-xl border-t-2 shadow-md ${colors[i % colors.length]}`}
          >
            <div className="text-sm font-bold font-mono leading-none mb-1">
              "{token}"
            </div>
            <div className="text-[10px] opacity-60 flex items-center gap-1 font-mono">
              <Hash size={10} /> {tokenIds?.[i]}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}