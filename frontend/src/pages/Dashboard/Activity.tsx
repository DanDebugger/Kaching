import { ArrowUpRight, ArrowDownLeft, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Activity() {
  const transactions = [
    {
      id: 1,
      type: 'receive',
      title: 'Incoming Remittance',
      amount: '+$500.00 USDC',
      fiat: '+₱ 27,650.00',
      date: 'Today, 10:42 AM',
      status: 'Completed',
    },
    {
      id: 2,
      type: 'split',
      title: 'Soroban Auto-Split',
      amount: '-$500.00 USDC',
      fiat: 'Routed to Pockets',
      date: 'Today, 10:42 AM',
      status: 'Smart Contract',
    },
    {
      id: 3,
      type: 'withdraw',
      title: 'Withdraw to GCash',
      amount: '-₱ 5,000.00',
      fiat: 'From Emergency Bank',
      date: 'Yesterday, 4:15 PM',
      status: 'Completed',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full relative gap-4 flex flex-col"
    >
      <h2 className="text-2xl font-bold text-white mb-2">Activity</h2>
      
      <div className="flex flex-col gap-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="bg-[#1A1A1E] rounded-[20px] p-4 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                tx.type === 'receive' ? 'bg-[#00C853]/10 text-[#00C853]' : 
                tx.type === 'withdraw' ? 'bg-rose-500/10 text-rose-400' : 'bg-blue-500/10 text-blue-400'
              }`}>
                {tx.type === 'receive' ? <ArrowDownLeft size={20} /> : 
                 tx.type === 'withdraw' ? <ArrowUpRight size={20} /> : <Zap size={20} />}
              </div>
              <div>
                <h4 className="text-slate-200 font-semibold text-sm">{tx.title}</h4>
                <p className="text-xs text-slate-400">{tx.date}</p>
              </div>
            </div>
            <div className="text-right">
               <span className={`font-bold block ${
                 tx.type === 'receive' ? 'text-[#00C853]' : 
                 tx.type === 'withdraw' ? 'text-white' : 'text-slate-300'
               }`}>{tx.amount}</span>
               <span className="text-[10px] text-slate-400 font-medium">{tx.fiat}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
