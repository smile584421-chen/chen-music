
import React, { useState, useEffect, ReactNode } from 'react';
import { Header } from './components/Header';
import { Carousel } from './components/Carousel';
import { MusicPlayer } from './components/MusicPlayer';
import { PlatformLinks } from './components/PlatformLinks';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { INITIAL_CAROUSEL, INITIAL_TRACKS } from './constants';
import { CarouselImage, MusicTrack } from './types';

interface ErrorBoundaryProps {
  children?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };
  props: ErrorBoundaryProps;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.props = props;
  }

  static getDerivedStateFromError(_error: any): ErrorBoundaryState {
    return { hasError: true };
  }
  
  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white p-6 text-center">
          <h1 className="text-2xl font-serif mb-4">系統資源載入異常</h1>
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }} 
            className="px-8 py-3 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs"
          >
            重置並恢復
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  const [images, setImages] = useState<CarouselImage[]>(INITIAL_CAROUSEL);
  const [tracks, setTracks] = useState<MusicTrack[]>(INITIAL_TRACKS);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  // 使用 v21 版本號強制刷新，確保讀取正確的 GitHub 檔案名稱
  const VERSION_KEY = 'chen_music_v21_final';

  useEffect(() => {
    try {
      const savedImages = localStorage.getItem(`${VERSION_KEY}_images`);
      const savedTracks = localStorage.getItem(`${VERSION_KEY}_tracks`);
      
      // 只有當 saved 資料存在且不是空陣列時才覆蓋初始值
      if (savedImages) {
        const parsed = JSON.parse(savedImages);
        if (parsed && parsed.length > 0) setImages(parsed);
      }
      
      if (savedTracks) {
        const parsed = JSON.parse(savedTracks);
        if (parsed && parsed.length > 0) setTracks(parsed);
      }
    } catch (e) {
      console.error("LocalStorage load error:", e);
    }
  }, []);

  const handleUpdateImages = (newImages: CarouselImage[]) => {
    setImages(newImages);
    localStorage.setItem(`${VERSION_KEY}_images`, JSON.stringify(newImages));
  };

  const handleUpdateTracks = (newTracks: MusicTrack[]) => {
    setTracks(newTracks);
    localStorage.setItem(`${VERSION_KEY}_tracks`, JSON.stringify(newTracks));
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col bg-[#000000] text-neutral-300">
        <Header 
          onAdminClick={() => setIsAdminOpen(true)} 
          isAdmin={isAdminOpen}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={() => setIsMusicPlaying(!isMusicPlaying)}
        />
        <main className="flex-grow relative z-10">
          <Carousel images={images} />
          <MusicPlayer 
            tracks={tracks} 
            externalControl={isMusicPlaying}
            onPlaybackChange={setIsMusicPlaying}
          />
          <div className="pb-10">
            <PlatformLinks />
          </div>
        </main>
        <Footer />

        {isAdminOpen && (
          <AdminPanel 
            images={images}
            tracks={tracks}
            onUpdateImages={handleUpdateImages}
            onUpdateTracks={handleUpdateTracks}
            onClose={() => setIsAdminOpen(false)}
          />
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;
