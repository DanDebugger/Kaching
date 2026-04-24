import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingOption, setIsLoadingOption] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleConnect = (walletName: string, isAvailable: boolean) => {
    if (!isAvailable) return;
    setIsLoadingOption(walletName);
    // Mock connection simulation for the hackathon
    setTimeout(() => {
      setAddress('GBMOCK...XYZ789');
      setIsLoadingOption(null);
      setIsModalOpen(false);
    }, 800);
  };

  const disconnectWallet = () => {
    setAddress(null);
  };

  const wallets = [
    { name: 'Albedo', iconUrl: 'https://www.google.com/s2/favicons?domain=albedo.link&sz=128', invertIcon: false, available: true },
    { name: 'Ledger', iconUrl: 'https://www.google.com/s2/favicons?domain=ledger.com&sz=128', invertIcon: true, available: true },
    { name: 'xBull', iconUrl: 'https://www.google.com/s2/favicons?domain=xbull.app&sz=128', invertIcon: false, available: true },
    { name: 'Freighter', iconUrl: 'https://www.google.com/s2/favicons?domain=freighter.app&sz=128', invertIcon: false, available: false },
    { name: 'LOBSTR', iconUrl: 'https://www.google.com/s2/favicons?domain=lobstr.co&sz=128', invertIcon: false, available: false },
    { name: 'Rabet', iconUrl: 'https://www.google.com/s2/favicons?domain=rabet.io&sz=128', invertIcon: false, available: false },
    { name: 'Hana Wallet', iconUrl: 'https://www.google.com/s2/favicons?domain=hanawallet.com&sz=128', invertIcon: false, available: false },
  ];

  return (
    <>
      {address ? (
        <button 
          onClick={disconnectWallet}
          className="bg-slate-800 hover:bg-slate-700 border border-white/10 text-white font-medium py-1.5 px-3 sm:px-4 rounded-full flex items-center gap-2 transition-colors shadow-sm text-sm"
        >
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse hidden sm:block" />
          <span className="opacity-80 text-[10px] sm:text-[11px] font-bold text-rose-400 sm:border-r border-white/10 sm:pr-2 sm:mr-1 tracking-wider uppercase">Testnet</span>
          <span className="hidden sm:inline tracking-wider font-mono">{address.substring(0, 4)}...{address.substring(address.length - 4)}</span>
        </button>
      ) : (
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#1f2128] hover:bg-[#252830] text-white font-medium py-2 px-3 sm:px-5 rounded-full border border-white/5 flex items-center gap-2 transition-all active:scale-[0.98] text-[13px] shadow-sm"
        >
           <span className="hidden sm:inline">Connect wallet</span>
           <span className="sm:hidden">Connect</span>
        </button>
      )}

      {mounted && createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-[760px] max-h-[90vh] overflow-y-auto bg-[#111114] rounded-[16px] shadow-2xl flex flex-col md:flex-row border border-white/[0.06]"
              >
                
                {/* Left Column (Learn More) */}
                <div className="p-6 md:p-10 md:w-[45%] flex flex-col gap-6 md:gap-8 bg-[#111114]">
                  <h2 className="text-[17px] font-bold text-white tracking-wide">Learn more</h2>
                  
                  <div>
                    <h3 className="text-[14px] font-semibold text-white mb-1.5 tracking-wide">What is a Wallet?</h3>
                    <p className="text-[13px] text-[#a1a1aa] leading-[1.6]">
                      Wallets are used to send, receive, and store the keys you use to sign blockchain transactions.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-[14px] font-semibold text-white mb-1.5 tracking-wide">What is Stellar?</h3>
                    <p className="text-[13px] text-[#a1a1aa] leading-[1.6]">
                      Stellar is a decentralized, public blockchain that gives developers the tools to create experiences that are more like cash than crypto.
                    </p>
                  </div>
                </div>

                {/* Right Column (Connect a Wallet) */}
                <div className="p-6 md:p-10 md:w-[55%] flex flex-col bg-[#111114] border-t md:border-t-0 md:border-l border-white/[0.06]">
                  <h2 className="text-[16px] font-bold text-white tracking-wide mb-4 md:mb-6">Connect a Wallet</h2>
                  
                  <div className="flex flex-col gap-0.5 overflow-y-auto max-h-[250px] md:max-h-[380px] custom-scrollbar pr-1">
                    {wallets.map((wallet) => (
                      <button 
                        key={wallet.name}
                        onClick={() => handleConnect(wallet.name, wallet.available)}
                        disabled={!wallet.available}
                        className={`w-full flex items-center justify-between p-3 rounded-[8px] transition-colors ${
                          wallet.available ? 'hover:bg-white/5 cursor-pointer' : 'cursor-default opacity-40'
                        }`}
                      >
                         <div className="flex items-center gap-4">
                           <img 
                             src={wallet.iconUrl} 
                             alt={`${wallet.name} icon`}
                             className={`w-6 h-6 rounded-full object-contain flex-shrink-0 ${!wallet.available ? 'grayscale opacity-60' : 'opacity-90'} ${wallet.invertIcon ? 'invert brightness-200 contrast-100' : ''}`}
                             onError={(e) => {
                               // Fallback if domain favicon acts strangely
                               e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${wallet.name}&backgroundColor=111114`;
                             }}
                           />
                           <span className="text-white font-[600] text-[14.5px] tracking-wide">{wallet.name}</span>
                         </div>

                         {isLoadingOption === wallet.name ? (
                           <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin mr-2" />
                         ) : !wallet.available ? (
                           <span className="text-[10px] text-slate-300 border border-slate-600 rounded-full px-[10px] py-[3px] font-medium tracking-wide">Not available</span>
                         ) : null}
                      </button>
                    ))}
                  </div>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
