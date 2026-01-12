
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
    <div id="music-section" className="px-6 py-12 max-w-[1200px] mx-auto bg-[#050505]">
      
      {/* 縮減引言間距 */}
      <div className="flex flex-col items-center text-center mb-12 animate-fade-up">
        <p className="text-[13px] md:text-[15px] text-neutral-400 font-serif font-light tracking-widest max-w-2xl leading-[2.4] italic">
          當世界偶爾變得吵雜...<br/>
          願流動的音符，能帶給你一點安定的力量。<br/>
          此刻，請閉上眼睛，讓心跟著節奏慢下來。
        </p>
        <div className="mt-6 opacity-30">
          <p className="text-[9px] tracking-[0.2em] uppercase leading-relaxed font-sans">
            When the world occasionally becomes noisy… may music bring you peace.<br/>
            At this moment, please close your eyes and let your heartbeat slow down.
          </p>
        </div>
        <div className="mt-10 w-8 h-[1px] bg-white/10" />
      </div>

      {/* 歌曲清單 - 增強播放按鈕顯著度 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
        {displayTracks.map((track, idx) => (
          <button 
            key={track.id} 
            onClick={() => handleTrackSelect(idx)}
            className={`flex items-center justify-between py-6 px-4 border-b transition-all duration-700 group text-left rounded-lg ${
              currentTrackIndex === idx 
                ? 'border-amber-500/30 bg-white/[0.02]' 
                : 'border-white/[0.03] hover:border-white/10 hover:bg-white/[0.01]'
            }`}
          >
            <div className="flex items-start gap-5">
              <span className="text-[9px] font-mono text-neutral-700 group-hover:text-amber-500 transition-colors mt-1.5">
                {String(idx + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col">
                 <span className={`text-[13px] md:text-[14px] font-serif font-light tracking-widest mb-2 transition-colors ${currentTrackIndex === idx ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                   {track.title}
                 </span>
                 <span className={`text-[10px] md:text-[11px] leading-relaxed tracking-wider font-light whitespace-pre-line transition-all duration-700 ${currentTrackIndex === idx ? 'text-neutral-400' : 'text-neutral-600 group-hover:text-neutral-500'}`}>
                   {track.artist}
                 </span>
              </div>
            </div>
            
            {/* 增強後的播放按鈕 */}
            <div className={`flex-shrink-0 w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-500 ${
              currentTrackIndex === idx 
                ? 'bg-amber-500 border-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]' 
                : 'border-white/10 text-neutral-400 group-hover:border-white/30 group-hover:text-white'
            }`}>
              {currentTrackIndex === idx && isPlaying ? (
                <Pause size={16} fill="currentColor" strokeWidth={1.5} />
              ) : (
                <Play size={16} fill={currentTrackIndex === idx ? "currentColor" : "none"} className={currentTrackIndex === idx ? "" : "ml-0.5"} strokeWidth={1.5} />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* 底部懸浮播放器 */}
      {currentTrack && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[100] bg-[#0c0c0c]/80 backdrop-blur-2xl border border-white/5 rounded-full p-2 flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-fade-up">
          <audio ref={audioRef} src={currentTrack.url} onEnded={() => setCurrentTrackIndex((currentTrackIndex! + 1) % displayTracks.length)} />
          <div className="relative shrink-0">
            <img src={currentTrack.coverUrl} className={`w-10 h-10 rounded-full object-cover grayscale transition-all duration-1000 ${isPlaying ? 'animate-[spin_12s_linear_infinite]' : 'opacity-40'}`} />
          </div>
          <div className="flex-grow overflow-hidden">
            <p className="text-white text-[11px] font-serif font-light truncate tracking-widest">{currentTrack.title}</p>
            <p className="text-neutral-600 text-[7px] tracking-[0.2em] uppercase font-light">Now Resonating</p>
          </div>
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-10 h-10 bg-white/5 hover:bg-white/10 text-white rounded-full flex items-center justify-center transition-all shrink-0 border border-white/5"
          >
            {isPlaying ? <Pause size={14} strokeWidth={1.5} /> : <Play size={14} strokeWidth={1.5} className="ml-0.5" />}
          </button>
        </div>
      )}
    </div>
  );
};
