
import React from 'react';
import { Settings, Volume2, VolumeX } from 'lucide-react';
import { GITHUB_RAW_BASE } from '../constants';

interface HeaderProps {
  onAdminClick: () => void;
  isAdmin: boolean;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onAdminClick, isAdmin, isMusicPlaying, onToggleMusic }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/40 backdrop-blur-xl transition-all duration-500">
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 h-32 md:h-40 flex items-center justify-between transition-all duration-500">
        <div 
          className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src={`${GITHUB_RAW_BASE}chen-logo1.png`} 
            alt="禎真音樂" 
            className="h-24 md:h-32 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.5)]"
          />
        </div>

        <div className="flex items-center gap-8 md:gap-12">
          <button 
            onClick={onToggleMusic}
            className="group flex items-center gap-3"
          >
            <span className="text-[9px] tracking-[0.4em] uppercase text-neutral-600 group-hover:text-amber-500/60 transition-colors hidden md:block font-bold">
              {isMusicPlaying ? 'On Air' : 'Mute'}
            </span>
            <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-700 ${isMusicPlaying ? 'border-amber-500/20 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'border-white/5 text-neutral-700'}`}>
              {isMusicPlaying ? <Volume2 size={12} /> : <VolumeX size={12} />}
            </div>
          </button>
          
          <button 
            onClick={onAdminClick}
            className={`transition-all duration-700 ${isAdmin ? 'text-amber-500' : 'text-neutral-800 hover:text-white/40'}`}
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
