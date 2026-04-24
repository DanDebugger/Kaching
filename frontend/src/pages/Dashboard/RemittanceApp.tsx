import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, ArrowRight, Zap, PiggyBank, GraduationCap, HeartPulse, CheckCircle2, RotateCcw } from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { playKachingSound } from '../../utils/audio';

function cn(...classes: (string | undefined | null | false)[]) {
  return twMerge(clsx(classes));
}

export const MOCK_ROUTES = [
  { id: 'maya', name: 'Maya', type: 'SEP-31', feePct: 1.5, time: '~5s', label: 'SAVINGS' },
  { id: 'gcash', name: 'GCash', type: 'SEP-31', feePct: 2.0, time: '~2s', label: 'FASTEST' },
  { id: 'cebuana', name: 'Cebuana', type: 'OTC', feePct: 2.5, time: '~10m', label: '' },
];

export default function RemittanceApp() {
  const [activeTab, setActiveTab] = useState<'send' | 'dashboard'>('send');
  
  // Routing Context
  const [selectedRoute, setSelectedRoute] = useState<string | null>('maya');
  const [receiptType, setReceiptType] = useState<'send' | 'withdraw'>('send');
  const [txHash, setTxHash] = useState<string>('a1b2c3d4...e5f6g7h8');

  // Withdrawal State
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawPocket, setWithdrawPocket] = useState('medical');
  const [withdrawAmount, setWithdrawAmount] = useState('5000');
  const [gcashNumber, setGcashNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // -- Send State --
  const [destination, setDestination] = useState<string>('');
  const [amount, setAmount] = useState<string>('500');
  const [isComparing, setIsComparing] = useState(false);
  const [showQuotes, setShowQuotes] = useState(false);

  // Receipt State
  const [showReceipt, setShowReceipt] = useState(false);

  // Splits
  const [tuitionPct, setTuitionPct] = useState(50);
  const [medicalPct, setMedicalPct] = useState(30);
  const [savingsPct, setSavingsPct] = useState(20);

  const handleDisplayQuotes = () => {
    setIsComparing(true);
    setTimeout(() => {
      setIsComparing(false);
      setShowQuotes(true);
    }, 800);
  };

  const handleSend = () => {
    setTxHash("a1b2c3d4...e5f6g7h8");
    setReceiptType('send');
    playKachingSound();
    setShowReceipt(true);
  };

  const handleOpenWithdrawForm = () => {
    setIsWithdrawing(true);
  };

  const handleWithdraw = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setTxHash("withdraw_hash_99xcf...");
      setSelectedRoute('gcash');
      setReceiptType('withdraw');
      playKachingSound();
      setShowReceipt(true);
    }, 1500);
  };

  const handleSendAnother = () => {
    setShowReceipt(false);
    setShowQuotes(false);
    setIsWithdrawing(false);
    setSelectedRoute('maya');
    setAmount('500');
    setDestination('');
  };

  if (showReceipt) {
    return (
      <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto w-full">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full glass-card flex flex-col items-center text-center p-8 backdrop-blur-2xl bg-emerald-900/10 border-emerald-500/30"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1.2, 1] }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
            className="bg-emerald-500/20 p-4 rounded-full mb-6"
          >
            <CheckCircle2 size={64} className="text-emerald-400" />
          </motion.div>

          <h3 className="text-2xl font-bold text-white mb-2">{receiptType === 'send' ? 'Ka-Ching! Receipt' : 'Withdrawal Complete!'}</h3>
          <p className="text-[#00C853]/80 mb-8 border-b border-white/10 pb-6">
             {receiptType === 'send' ? 'Remittance routed and split securely.' : 'Funds have been disbursed to your GCash account.'}
          </p>

          <div className="w-full space-y-4 text-left">
             {receiptType === 'send' ? (
               <>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-slate-400">Total Sent</span>
                   <span className="text-white font-bold">${amount} USDC</span>
                 </div>
                 <div className="flex justify-between border-b border-white/5 pb-2">
                   <span className="text-slate-400">Arrived (PHP)</span>
                   <span className="text-[#00C853] font-bold">₱ {((parseFloat(amount) || 0) * 56.12 * 0.985).toFixed(2)}</span>
                 </div>
               </>
             ) : (
               <div className="flex justify-between border-b border-white/5 pb-2">
                 <span className="text-slate-400">Amount Withdrawn</span>
                 <span className="text-[#00C853] font-bold text-xl">₱ {(parseFloat(withdrawAmount) || 0).toFixed(2)}</span>
               </div>
             )}

             <div className="flex justify-between border-b border-white/5 pb-2">
               <span className="text-slate-400">Route Used</span>
               <span className="text-white">{MOCK_ROUTES.find(r => r.id === selectedRoute)?.name || 'GCash'} ({MOCK_ROUTES.find(r => r.id === selectedRoute)?.type || 'SEP-31'})</span>
             </div>
             <div className="flex justify-between border-b border-white/5 pb-4 items-center gap-2">
               <span className="text-slate-400 whitespace-nowrap">Mock Hash</span>
               <span className="text-[#00C853] font-mono text-[10px] break-all text-right bg-[#00C853]/10 px-2 py-0.5 rounded">{txHash}</span>
             </div>
             
             {receiptType === 'send' && (
               <div className="bg-slate-900/50 p-4 rounded-[16px] mt-4 border border-white/5 relative overflow-hidden">
                 <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">Soroban Splits Applied:</p>
                 <div className="flex flex-col gap-2 text-sm relative z-10">
                   <div className="flex justify-between"><span className="text-blue-400 flex items-center gap-1"><GraduationCap size={14} /> Tuition ({(tuitionPct)}%)</span> <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded">₱ {((parseFloat(amount) || 0) * 56.12 * 0.985 * (tuitionPct/100)).toFixed(2)}</span></div>
                   <div className="flex justify-between"><span className="text-rose-400 flex items-center gap-1"><HeartPulse size={14} /> Medical ({(medicalPct)}%)</span> <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded">₱ {((parseFloat(amount) || 0) * 56.12 * 0.985 * (medicalPct/100)).toFixed(2)}</span></div>
                   <div className="flex justify-between"><span className="text-[#00C853] flex items-center gap-1"><PiggyBank size={14} /> Savings ({(savingsPct)}%)</span> <span className="text-white font-medium bg-white/5 px-2 py-0.5 rounded">₱ {((parseFloat(amount) || 0) * 56.12 * 0.985 * (savingsPct/100)).toFixed(2)}</span></div>
                 </div>
               </div>
             )}
          </div>

          <button 
            onClick={handleSendAnother}
            className="w-full mt-8 bg-[#1A1A1E] hover:bg-white/10 text-white font-bold py-4 rounded-[16px] border border-white/10 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
             <RotateCcw size={18} /> {receiptType === 'send' ? 'Send Another' : 'Back to Pockets'}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center max-w-md mx-auto w-full">
      {/* Tabs */}
      <div className="flex gap-2 bg-[#1A1A1E] p-1 rounded-[16px] mb-6 w-full border border-white/5">
        <button
          onClick={() => setActiveTab('send')}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
            activeTab === 'send' ? "bg-emerald-500/20 text-emerald-400 shadow-sm" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          )}
        >
          Send & Split
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={cn(
            "flex-1 py-2 text-sm font-medium rounded-lg transition-all",
            activeTab === 'dashboard' ? "bg-blue-500/20 text-blue-400 shadow-sm" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          )}
        >
          Pockets
        </button>
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode='wait'>
        {activeTab === 'send' && (
          <motion.div
            key="send"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full relative"
          >
            <div className="glass-card flex flex-col gap-5">
              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1 block">Receiver Crypto Wallet (Public Key)</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Stellar Wallet Address (G...)"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 px-4 text-white text-sm font-medium focus:outline-none focus:border-emerald-500/50 transition-colors placeholder:text-slate-600"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1 block">Send Amount (USDC)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white text-xl font-medium focus:outline-none focus:border-emerald-500/50 transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">Auto-Split Workflow</label>
                  <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full">Soroban Ready</span>
                </div>
                <div className="bg-slate-900/30 rounded-xl p-4 border border-white/5 space-y-4">
                  <div className="flex items-center gap-3">
                    <GraduationCap className="text-blue-400 w-5 h-5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">Tuition</span>
                        <span className="text-white font-medium">{tuitionPct}%</span>
                      </div>
                      <input type="range" className="w-full accent-blue-500" value={tuitionPct} onChange={(e) => setTuitionPct(Number(e.target.value))} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <HeartPulse className="text-rose-400 w-5 h-5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">Medical</span>
                        <span className="text-white font-medium">{medicalPct}%</span>
                      </div>
                      <input type="range" className="w-full accent-rose-500" value={medicalPct} onChange={(e) => setMedicalPct(Number(e.target.value))} />
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <PiggyBank className="text-emerald-400 w-5 h-5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-300">Savings</span>
                        <span className="text-white font-medium">{savingsPct}%</span>
                      </div>
                      <input type="range" className="w-full accent-emerald-500" value={savingsPct} onChange={(e) => setSavingsPct(Number(e.target.value))} />
                    </div>
                  </div>
                </div>
              </div>

              {!showQuotes ? (
                <button
                  onClick={handleDisplayQuotes}
                  className="w-full mt-2 bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 px-4 rounded-xl border border-white/10 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  {isComparing ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                  ) : (
                    <>Compare & Optimize Deals <Settings size={18} /></>
                  )}
                </button>
              ) : (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 space-y-3"
                >
                  <label className="text-xs text-[#00C853] uppercase tracking-wider font-semibold mb-2 block flex items-center gap-1">
                    <Zap size={14} /> Available Payment Routes
                  </label>

                  <div className="flex flex-col gap-3">
                    {MOCK_ROUTES.map((route) => {
                      const feeMultiplier = (100 - route.feePct) / 100;
                      const finalPhp = ((parseFloat(amount) || 0) * 56.12 * feeMultiplier).toFixed(2);
                      const isSelected = selectedRoute === route.id;

                      return (
                        <div
                          key={route.id}
                          onClick={() => setSelectedRoute(route.id)}
                          className={cn("rounded-[20px] p-4 flex flex-col gap-2 relative overflow-hidden cursor-pointer transition-all border", isSelected ? "bg-[#00C853]/10 border-[#00C853]/50 shadow-[0_0_15px_rgba(0,200,83,0.1)]" : "bg-[#1A1A1E] border-white/5 hover:border-white/20")}
                        >
                          {route.label && (
                            <div className={cn("absolute top-0 right-0 text-[10px] font-bold px-2 py-0.5 rounded-bl-[10px]", isSelected ? "bg-[#00C853] text-slate-900" : "bg-white/10 text-white")}>
                              {route.label}
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <h4 className="text-white font-semibold flex items-center gap-2">{route.name} <span className="opacity-50 font-normal text-sm">({route.type})</span></h4>
                            <span className={cn("font-bold whitespace-nowrap", isSelected ? "text-[#00C853]" : "text-slate-300")}>₱ {finalPhp}</span>
                          </div>
                          <div className="flex justify-between text-sm text-slate-400">
                            <span>Fee: {route.feePct}%</span>
                            <span>Time: <span className="text-slate-300">{route.time}</span></span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleSend}
                    disabled={!destination || !selectedRoute}
                    className="w-full mt-6 bg-[#00C853] hover:bg-[#00e65e] disabled:opacity-50 disabled:hover:bg-[#00C853] text-slate-900 font-bold py-4 px-4 rounded-[16px] shadow-[0_0_20px_rgba(0,200,83,0.3)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                  >
                    Send to Pockets <ArrowRight size={18} />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="w-full relative gap-4 flex flex-col"
          >
            {isWithdrawing ? (
              isProcessing ? (
                <div className="w-full glass-card flex flex-col items-center justify-center p-12 mt-2 bg-[#1A1A1E] border border-white/5 rounded-[24px] text-center min-h-[400px]">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-16 h-16 border-4 border-[#00C853]/20 border-t-[#00C853] rounded-full mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-2">Processing Withdrawal...</h3>
                  <p className="text-slate-400 text-sm">Securing transfer to GCash</p>
                  <p className="text-slate-500 font-mono text-[10px] mt-8 bg-black/20 px-3 py-1 rounded">waiting for bridge confirmation...</p>
                </div>
              ) : (
                <div className="w-full glass-card flex flex-col gap-5 mt-2 bg-[#1A1A1E] border border-white/5 p-6 rounded-[24px]">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                    <RotateCcw size={20} className="text-[#00C853]" /> Withdraw Funds
                  </h3>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1 block">Source Pocket</label>
                    <select 
                      value={withdrawPocket}
                      onChange={(e) => setWithdrawPocket(e.target.value)}
                      className="w-full bg-[#111114] border border-white/10 rounded-xl py-3 px-4 text-white text-sm font-medium focus:outline-none focus:border-[#00C853]/50 transition-colors"
                    >
                      <option value="medical">Medical Bank (₱ 34,500)</option>
                      <option value="tuition">Tuition Fund (₱ 50,000)</option>
                      <option value="emergency">Emergency Bank (₱ 40,000)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1 block">Withdrawal Amount (PHP)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₱</span>
                      <input 
                        type="number"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        className="w-full bg-[#111114] border border-white/10 rounded-xl py-3 pl-8 pr-4 text-white text-xl font-medium focus:outline-none focus:border-[#00C853]/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-1 block">Destination GCash Number</label>
                    <input 
                      type="tel"
                      placeholder="09XX XXX XXXX"
                      value={gcashNumber}
                      onChange={(e) => setGcashNumber(e.target.value)}
                      className="w-full bg-[#111114] border border-white/10 rounded-xl py-3 px-4 text-white text-sm font-medium focus:outline-none focus:border-[#00C853]/50 transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  <div className="bg-[#111114] p-4 rounded-[16px] border border-white/5 space-y-2 mt-2">
                     <div className="flex justify-between text-sm">
                       <span className="text-slate-400">Withdrawal Request</span>
                       <span className="text-white">₱ {(parseFloat(withdrawAmount) || 0).toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-sm">
                       <span className="text-rose-400">GCash Route Fee (2%)</span>
                       <span className="text-rose-400">- ₱ {((parseFloat(withdrawAmount) || 0) * 0.02).toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-base font-bold pt-2 border-t border-white/10 mt-2">
                       <span className="text-slate-300">Net Receive</span>
                       <span className="text-[#00C853]">₱ {((parseFloat(withdrawAmount) || 0) * 0.98).toFixed(2)}</span>
                     </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <button 
                      onClick={() => setIsWithdrawing(false)}
                      className="flex-1 bg-transparent hover:bg-white/5 text-slate-300 font-bold py-4 rounded-[16px] transition-all"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleWithdraw}
                      disabled={!withdrawAmount || !gcashNumber || isProcessing}
                      className="flex-[2] bg-[#00C853] hover:bg-[#00e65e] disabled:opacity-50 disabled:hover:bg-[#00C853] text-slate-900 font-bold py-4 rounded-[16px] shadow-[0_0_20px_rgba(0,200,83,0.3)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                      Proceed <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )
            ) : (
              <>
                {/* Massive Stitch-like Pocket Header */}
                <div className="bg-[#1A1A1E] rounded-[24px] p-8 border border-white/5 flex flex-col items-center text-center shadow-lg relative overflow-hidden mt-2">
                  <div className="absolute top-0 w-full h-1 bg-[#00C853]" />

                  <span className="bg-white/10 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-[#00C853]" /> Ready for Withdrawal
                  </span>

                  <p className="text-slate-400 text-sm mb-1">Available Medical Balance</p>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">₱ 34,500</h2>
                  <p className="text-[#00C853] font-medium text-sm flex items-center gap-1">
                    Goal: ₱ 40,000 (+85% Funded)
                  </p>

                  {/* Quick Actions Grid */}
                  <div className="flex justify-center gap-6 mt-8 w-full border-t border-white/5 pt-6">
                    <button className="flex flex-col items-center gap-2 group">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition">
                        <PiggyBank size={20} className="text-white" />
                      </div>
                      <span className="text-xs text-slate-400 font-medium">Add Funds</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 group">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition">
                        <HeartPulse size={20} className="text-white" />
                      </div>
                      <span className="text-xs text-slate-400 font-medium">Auto-Split</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 group">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition">
                        <Settings size={20} className="text-white" />
                      </div>
                      <span className="text-xs text-slate-400 font-medium">Settings</span>
                    </button>
                  </div>
                </div>

                {/* Withdraw Button */}
                <button 
                  onClick={handleOpenWithdrawForm}
                  className="w-full bg-[#00C853] hover:bg-[#00e65e] active:scale-[0.98] transition-all text-slate-900 font-bold py-4 rounded-[16px] text-lg shadow-[0_0_20px_rgba(0,200,83,0.3)] flex items-center justify-center gap-2 mt-2"
                >
                  Withdraw to GCash <ArrowRight size={20} />
                </button>

                {/* Other Pockets List */}
                <div className="mt-4">
                  <h3 className="text-white font-bold mb-3 px-1">Other Asset Pockets</h3>

                  <div className="flex flex-col gap-3">
                    <div className="bg-[#1A1A1E] rounded-[20px] p-4 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <GraduationCap className="text-blue-400 w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-slate-200 font-semibold text-sm">Tuition Fund</h4>
                          <p className="text-xs text-slate-400">Locked via Soroban</p>
                        </div>
                      </div>
                      <span className="font-bold text-white">₱ 50,000</span>
                    </div>

                    <div className="bg-[#1A1A1E] rounded-[20px] p-4 border border-white/5 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#00C853]/10 flex items-center justify-center">
                          <PiggyBank className="text-[#00C853] w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-slate-200 font-semibold text-sm">Emergency Bank</h4>
                          <p className="text-xs text-slate-400">Yielding 5% APY</p>
                        </div>
                      </div>
                      <span className="font-bold text-white">₱ 40,000</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
