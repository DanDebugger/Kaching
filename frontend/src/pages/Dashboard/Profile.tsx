import { Shield, Bell, HelpCircle, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full relative gap-4 flex flex-col"
    >
      <h2 className="text-2xl font-bold text-white mb-4">Profile</h2>
      
      <div className="flex items-center gap-4 mb-2">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#00C853] to-blue-500 flex items-center justify-center p-1">
           <div className="w-full h-full bg-[#111114] rounded-full border-2 border-[#111114] flex items-center justify-center overflow-hidden">
             <span className="font-bold text-xl text-white">DJ</span>
           </div>
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Juan Dela Cruz</h3>
          <p className="text-sm text-slate-400 font-mono">GABC...X7YZ</p>
        </div>
      </div>

      <div className="bg-[#1A1A1E] rounded-[24px] border border-white/5 overflow-hidden mt-4">
        <button className="w-full flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
             <Shield size={18} className="text-blue-400" />
             <span className="text-slate-200 text-sm font-medium">Security & Limits</span>
          </div>
        </button>
        <button className="w-full flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
             <Bell size={18} className="text-rose-400" />
             <span className="text-slate-200 text-sm font-medium">Notifications</span>
          </div>
        </button>
        <button className="w-full flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
          <div className="flex items-center gap-3">
             <HelpCircle size={18} className="text-emerald-400" />
             <span className="text-slate-200 text-sm font-medium">Help & Support</span>
          </div>
        </button>
      </div>

      <button 
        onClick={() => navigate('/login')}
        className="w-full mt-4 bg-[#1A1A1E] hover:bg-rose-500/10 text-rose-400 border border-white/5 font-bold py-4 rounded-[16px] text-sm flex items-center justify-center gap-2 transition-all"
      >
        <LogOut size={18} /> Log out
      </button>

      <div className="text-center mt-6">
        <p className="text-xs text-slate-600">KaChing App v1.0.0-beta</p>
      </div>
    </motion.div>
  );
}
