
import React, { useEffect, useRef, useState } from 'react';
import { CarouselImage } from '../types';

interface CarouselProps {
  images: CarouselImage[];
}

export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollPosition = container.scrollLeft;
      const effectiveWidth = window.innerWidth < 768 ? (window.innerWidth * 0.85 + 32) : 640;
      const index = Math.round(scrollPosition / effectiveWidth);
      setActiveIndex(Math.min(Math.max(index, 0), images.length - 1));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    const timer = setInterval(() => {
      if (!container) return;
      const nextIndex = (activeIndex + 1) % images.length;
      const scrollTarget = nextIndex * (window.innerWidth < 768 ? (window.innerWidth * 0.85 + 32) : 640);
      container.scrollTo({ left: scrollTarget, behavior: 'smooth' });
    }, 10000);

    return () => {
      clearInterval(timer);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [images, activeIndex]);

  if (!images || images.length === 0) return (
    <div className="pt-32 pb-16 flex items-center justify-center text-white/20 uppercase tracking-widest text-xs">
      Loading visual assets...
    </div>
  );

  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-[#000000]">
      <div className="absolute top-32 left-1/2 -translate-x-1/2 pointer-events-none opacity-[0.03] select-none whitespace-nowrap">
        <span className="text-[18vw] font-serif font-black tracking-[-0.05em] uppercase leading-none block">
          Visual Symphony
        </span>
      </div>

      <div 
        ref={scrollRef}
        className="relative z-10 flex overflow-x-auto gap-8 md:gap-16 px-6 md:px-[15vw] no-scrollbar snap-x snap-mandatory scroll-smooth pb-8"
      >
        {images.slice(0, 6).map((image, idx) => (
          <div
            key={image.id}
            className="flex-none w-[85vw] md:w-[580px] aspect-[4/5] relative rounded-[4px] overflow-hidden snap-center group border border-white/[0.08] bg-neutral-900 transition-all duration-1000 shadow-2xl"
          >
            <div className="absolute inset-0 overflow-hidden bg-neutral-900">
              <img
                src={image.url}
                alt={image.title}
                onError={(e) => {
                  console.error(`Image load failed: ${image.url}`);
                  e.currentTarget.style.display = 'none';
                }}
                className="w-full h-full object-cover transition-all duration-[4s] ease-out scale-105 group-hover:scale-110 opacity-80 group-hover:opacity-100"
              />
              {/* 減輕漸變層的遮蓋感，讓圖片更明顯 */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80 opacity-60 group-hover:opacity-30 transition-opacity duration-1000" />
            </div>

            <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-end z-20">
              <div className="mb-4 overflow-hidden">
                 <span className="inline-block text-[10px] tracking-[0.5em] text-amber-500/80 uppercase font-light mb-2 translate-y-full group-hover:translate-y-0 transition-transform duration-700">
                   Collection {String(idx + 1).padStart(2, '0')}
                 </span>
              </div>
              <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-1000 ease-out">
                <h3 className="text-2xl md:text-3xl font-serif text-white tracking-[0.1em] font-light leading-tight mb-4">
                  {image.title}
                </h3>
                <div className="h-[1px] w-0 group-hover:w-16 bg-amber-500/40 transition-all duration-1000 mb-4" />
                <p className="text-[9px] text-white/30 tracking-[0.4em] uppercase font-light italic">
                  {image.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-[1400px] mx-auto px-10 flex flex-col items-center gap-6">
        <div className="flex gap-4 items-center">
          {images.slice(0, 6).map((_, i) => (
            <button 
              key={i} 
              onClick={() => {
                const scrollTarget = i * (window.innerWidth < 768 ? (window.innerWidth * 0.85 + 32) : 640);
                scrollRef.current?.scrollTo({ left: scrollTarget, behavior: 'smooth' });
              }}
              className={`group relative h-10 flex items-center transition-all duration-500`}
            >
              <div className={`h-[1px] transition-all duration-700 ${activeIndex === i ? 'w-16 bg-amber-500' : 'w-4 bg-white/10 group-hover:bg-white/30'}`} />
              {activeIndex === i && (
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono text-amber-500/60 animate-fade-up">
                  {String(i + 1).padStart(2, '0')}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
