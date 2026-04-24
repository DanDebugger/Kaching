import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Home, Activity, PieChart, User } from 'lucide-react';
import WalletConnect from '../components/WalletConnect';
import clsx from 'clsx';

export default function MainLayout() {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/activity', label: 'Activity', icon: Activity },
    { to: '/assets', label: 'Assets', icon: PieChart },
    { to: '/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="min-h-screen bg-[#09090b] flex w-full overflow-hidden">
      
      {/* 🖥️ Desktop Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#111114] border-r border-white/5 h-screen z-30">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 flex items-center justify-center bg-[#00C853] rounded-[10px] text-black font-extrabold shadow-sm text-lg">
            ₱
          </div>
          <span className="text-white font-bold tracking-tight text-xl">KaChing</span>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                  isActive ? "bg-[#00C853]/10 text-[#00C853]" : "text-slate-500 hover:text-slate-300 hover:bg-white/5"
                )}
              >
                <link.icon size={20} />
                {link.label}
              </NavLink>
            );
          })}
        </nav>
      </aside>

      {/* 📱 Main App Container (Responsive) */}
      <div className="flex-1 flex flex-col h-[100dvh] relative overflow-hidden bg-[#111114] md:bg-[#09090b]">
        
        {/* Top Header */}
        <header className="w-full bg-[#111114] border-b border-white/5 flex items-center justify-between px-4 py-3 z-30 sticky top-0">
          <div className="flex items-center gap-2 md:hidden">
            <div className="w-8 h-8 flex items-center justify-center bg-[#00C853] rounded-[10px] text-black font-extrabold shadow-sm text-lg">
              ₱
            </div>
            <span className="text-white font-bold tracking-tight">KaChing</span>
          </div>
          <div className="hidden md:block text-slate-400 font-medium">Dashboard</div>
          <WalletConnect />
        </header>

        {/* Page Yield */}
        <main className="flex-1 overflow-y-auto w-full relative custom-scrollbar pb-24 md:pb-8">
           <div className="max-w-xl mx-auto w-full p-2 md:p-8">
              <Outlet />
           </div>
        </main>

        {/* 📱 Fixed Bottom Navbar (Hidden on Desktop) */}
        <nav className="md:hidden absolute bottom-0 w-full bg-[#1A1A1E] border-t border-white/5 pb-safe px-2 py-2 flex justify-between items-center z-40 rounded-t-[24px]">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className="flex flex-col items-center justify-center w-16 h-12 gap-1 relative"
              >
                <link.icon 
                  size={22} 
                  className={clsx("transition-colors", isActive ? "text-[#00C853]" : "text-slate-500")} 
                  fill={isActive ? "#00C853" : "none"}
                />
                <span className={clsx("text-[10px] font-medium transition-colors", isActive ? "text-[#00C853]" : "text-slate-500")}>
                  {link.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

      </div>
    </div>
  );
}
