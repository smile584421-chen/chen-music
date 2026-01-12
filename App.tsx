
import React, { useState, useEffect, ReactNode, Component } from 'react';
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

// Fix: Explicitly use Component and property initializer for state to resolve TS access errors for props and state
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

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
            重置系統並重試
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

  // 使用 v23 強制讀取最新的英文檔名配置
  const VERSION_KEY = 'chen_music_v23_english_assets';

  useEffect(() => {
    try {
      const savedImages = localStorage.getItem(`${VERSION_KEY}_images`);
      const savedTracks = localStorage.getItem(`${VERSION_KEY}_tracks`);
      
      if (savedImages) {
        const parsed = JSON.parse(savedImages);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
           setImages(parsed);
        }
      }
      
      if (savedTracks) {
        const parsed = JSON.parse(savedTracks);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
           setTracks(parsed);
        }
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
