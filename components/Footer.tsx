
import React from 'react';
import { GITHUB_RAW_BASE } from '../constants';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-black py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="mb-10">
          <div className="flex items-center justify-center mb-6">
            <img 
              src={`${GITHUB_RAW_BASE}chen-logo1.png`} 
              alt="禎真音樂" 
              className="h-20 w-auto object-contain opacity-80 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          <p className="text-neutral-600 max-w-xs mx-auto leading-relaxed mb-8 text-[11px] tracking-[0.3em] font-serif italic">
            以真摯的心弦，奏響靈魂的共鳴
          </p>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[9px] text-neutral-800 uppercase tracking-[0.5em] gap-4">
        <p>&copy; {new Date().getFullYear()} CHEN CHEN MUSIC</p>
        <p className="font-serif italic opacity-40">SOUL RESONANCE EXPERIENCE</p>
      </div>
    </footer>
  );
};
