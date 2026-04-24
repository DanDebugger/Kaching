import { TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Assets() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full relative gap-4 flex flex-col"
    >
      <h2 className="text-2xl font-bold text-white mb-2">My Assets</h2>
      
      <div className="bg-[#1A1A1E] rounded-[24px] p-6 border border-white/5 flex flex-col shadow-lg mb-2">
        <p className="text-slate-400 text-sm mb-1">Total Balance</p>
        <h2 className="text-4xl font-extrabold text-white tracking-tight mb-2">₱ 124,500</h2>
        <p className="text-[#00C853] font-medium text-sm flex items-center gap-1">
          <TrendingUp size={16} /> +2.4% (Last 30 days)
        </p>
      </div>

      <h3 className="text-white font-bold mb-2">Holdings</h3>
      
      <div className="flex flex-col gap-3">
        <div className="bg-[#1A1A1E] rounded-[20px] p-4 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center border border-white/10">
              <span className="font-bold text-white text-xs">PHP</span>
            </div>
            <div>
              <h4 className="text-slate-200 font-semibold text-sm">Philippine Peso</h4>
              <p className="text-xs text-slate-400">Yielding Pockets</p>
            </div>
          </div>
          <div className="text-right">
             <span className="font-bold block text-white">₱ 90,000</span>
             <span className="text-[10px] text-slate-400">72.2% of portfolio</span>
          </div>
        </div>

        <div className="bg-[#1A1A1E] rounded-[20px] p-4 border border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
              <span className="font-bold text-blue-400 text-xs">$</span>
            </div>
            <div>
              <h4 className="text-slate-200 font-semibold text-sm">USDC</h4>
              <p className="text-xs text-slate-400">Stellar Network</p>
            </div>
          </div>
          <div className="text-right">
             <span className="font-bold block text-white">614.76 USDC</span>
             <span className="text-[10px] text-slate-400">₱ 34,500 • 27.8%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
