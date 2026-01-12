
import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { MusicTrack } from '../types';

interface MusicPlayerProps {
  tracks: MusicTrack[];
  externalControl?: boolean;
  onPlaybackChange?: (playing: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ tracks, externalControl, onPlaybackChange }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const displayTracks = tracks.slice(0, 12);
  const currentTrack = currentTrackIndex !== null ? displayTracks[currentTrackIndex] : null;

  useEffect(() => {
    if (externalControl !== undefined) setIsPlaying(externalControl);
  }, [externalControl]);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying && currentTrack) {
        audioRef.current.play().catch(() => {
            setIsPlaying(false);
            onPlaybackChange?.(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, currentTrack]);

  const handleTrackSelect = (idx: number) => {
    if (currentTrackIndex === idx) {
      const newState = !isPlaying;
      setIsPlaying(newState);
      onPlaybackChange?.(newState);
    } else {
      setCurrentTrackIndex(idx);
      setIsPlaying(true);
      onPlaybackChange?.(true);
    }
  };

  return (
    <div id="music-section" className="px-6 py-24 max-w-[1200px] mx-auto bg-[#000000]">
      
      <div className="flex flex-col items-center text-center mb-20 animate-fade-up">
        <h2 className="text-[10px] tracking-[0.8em] uppercase text-amber-500/50 mb-8 font-light">Auditory Journey</h2>
        <p className="text-[14px] md:text-[16px] text-neutral-300 font-serif font-light tracking-[0.15em] max-w-2xl leading-[2.6] italic">
          願流動的音符，能帶給你一點安定的力量。<br/>
          此刻，請閉上眼睛，讓心跟著節奏慢下來。
        </p>
        <div className="mt-12 w-12 h-[1px] bg-white/10" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6">
        {displayTracks.map((track, idx) => (
          <button 
            key={track.id} 
            onClick={() => handleTrackSelect(idx)}
            className={`flex items-center justify-between py-8 px-6 border-b transition-all duration-700 group text-left ${
              currentTrackIndex === idx 
                ? 'border-amber-500/40 bg-white/[0.03]' 
                : 'border-white/[0.05] hover:border-white/10 hover:bg-white/[0.01]'
            }`}
          >
            <div className="flex items-start gap-6">
              <span className="text-[9px] font-mono text-neutral-800 group-hover:text-amber-500/40 transition-colors mt-1.5">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col">
                 <span className={`text-[14px] md:text-[15px] font-serif font-light tracking-[0.1em] mb-2 transition-colors ${currentTrackIndex === idx ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                   {track.title}
                 </span>
                 <span className={`text-[10px] md:text-[11px] leading-relaxed tracking-widest font-light text-neutral-600 group-hover:text-neutral-500 transition-all duration-700`}>
                   {track.artist}
                 </span>
              </div>
            </div>
            
            <div className={`flex-shrink-0 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-500 ${
              currentTrackIndex === idx 
                ? 'bg-amber-500 border-amber-500 text-black' 
                : 'border-white/5 text-neutral-700 group-hover:border-white/20 group-hover:text-white'
            }`}>
              {currentTrackIndex === idx && isPlaying ? (
                <Pause size={14} fill="currentColor" />
              ) : (
                <Play size={14} fill={currentTrackIndex === idx ? "currentColor" : "none"} className={currentTrackIndex === idx ? "" : "ml-0.5"} />
              )}
            </div>
          </button>
        ))}
      </div>

      {currentTrack && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[100] bg-[#080808]/90 backdrop-blur-3xl border border-white/10 rounded-2xl p-3 flex items-center gap-4 shadow-2xl animate-fade-up">
          <audio ref={audioRef} src={currentTrack.url} onEnded={() => setCurrentTrackIndex((currentTrackIndex! + 1) % displayTracks.length)} />
          <div className="relative shrink-0 overflow-hidden rounded-lg">
            <img src={currentTrack.coverUrl} className={`w-12 h-12 object-cover grayscale transition-all duration-[3s] ${isPlaying ? 'scale-110' : 'opacity-40'}`} />
          </div>
          <div className="flex-grow overflow-hidden">
            <p className="text-white text-[12px] font-serif font-light truncate tracking-wider">{currentTrack.title}</p>
            <p className="text-amber-500/60 text-[8px] tracking-[0.3em] uppercase font-light mt-1">Resonating</p>
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all shrink-0"
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} className="ml-0.5" />}
          </button>
        </div>
      )}
    </div>
  );
};
