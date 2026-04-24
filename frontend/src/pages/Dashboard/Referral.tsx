import { motion } from 'framer-motion';
import { Gift, Share2, Users, Download, Zap } from 'lucide-react';
import { playKachingSound } from '../../utils/audio';

export default function Referral() {
  const handleClaim = () => {
    playKachingSound();
    alert("Mock: Interacting with Soroban smart contract to claim USDC yields!");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white glow-text mb-2 flex items-center gap-2">
          KaChing Network <Zap className="text-emerald-400" size={20} />
        </h2>
        <p className="text-slate-400">On-chain Referral and Savings contract yields. (Hackathon Mockup UI)</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass-card flex flex-col items-center justify-center text-center p-6 border-t border-blue-500/30">
          <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-3 text-blue-400">
            <Users size={24} />
          </div>
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Invited Families</p>
          <h3 className="text-3xl font-bold text-white">12</h3>
        </div>
        
        <div className="glass-card flex flex-col items-center justify-center text-center p-6 border-t border-emerald-500/30 relative overflow-hidden">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center mb-3 text-emerald-400">
            <Gift size={24} />
          </div>
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Unclaimed Rewards</p>
          <h3 className="text-3xl font-bold text-emerald-400">25.50 <span className="text-sm text-emerald-400/50">USDC</span></h3>
        </div>

        <div className="glass-card flex flex-col items-center justify-center text-center p-6 border-t border-purple-500/30 relative overflow-hidden">
          <div className="w-12 h-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-3 text-purple-400">
            <Zap size={24} />
          </div>
          <p className="text-sm text-slate-400 uppercase tracking-wider mb-1">Network Yield</p>
          <h3 className="text-3xl font-bold text-purple-400">4.2% <span className="text-sm text-purple-400/50">APB</span></h3>
        </div>
      </div>

      <div className="glass-card mb-8">
        <h3 className="text-lg font-bold text-white mb-4">Your Smart Referral Link</h3>
        <p className="text-sm text-slate-400 mb-4">
          When an OFW uses your link and deposits via Stellar Anchors, Soroban routes 0.5% fee savings directly into your wallet.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-slate-300 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap select-all">
            https://kaching.ph/invite/GD5R...K9PL
          </div>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-medium py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all">
            <Share2 size={18} /> Copy Invite
          </button>
        </div>
      </div>

      <div className="flex justify-end">
         <motion.button 
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           onClick={handleClaim}
           className="bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold py-4 px-8 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all"
         >
            <Download size={20} /> Claim Reward Yield
         </motion.button>
      </div>

    </div>
  );
}
