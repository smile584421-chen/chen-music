
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
      const cardWidth = container.clientWidth * 0.85; 
      const desktopCardWidth = 520; 
      
      const effectiveWidth = window.innerWidth < 768 ? cardWidth : desktopCardWidth;
      const index = Math.round(scrollPosition / effectiveWidth);
      setActiveIndex(Math.min(index, 5));
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    
    const autoScroll = () => {
      if (!container) return;
      if (container.scrollLeft >= (container.scrollWidth - container.clientWidth - 100)) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: window.innerWidth < 768 ? 320 : 520, behavior: 'smooth' });
      }
    };

    const timer = setInterval(autoScroll, 8000);
    return () => {
      clearInterval(timer);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <section className="relative pt-32 pb-8 overflow-hidden bg-[#050505]">
      {/* 裝飾性背景文字 */}
      <div className="absolute top-24 left-8 pointer-events-none opacity-[0.02] select-none">
        <span className="text-[20vw] font-serif font-black tracking-tighter uppercase leading-none block transform -rotate-2">Gallery</span>
      </div>

      <div 
        ref={scrollRef}
        className="relative z-10 flex overflow-x-auto gap-8 md:gap-12 px-6 md:px-[12vw] no-scrollbar snap-x snap-mandatory scroll-smooth pb-12"
      >
        {images.slice(0, 6).map((image, idx) => (
          <div
            key={image.id}
            className="flex-none w-[85vw] md:w-[480px] aspect-[3/4] relative rounded-[2px] overflow-hidden snap-center group border border-white/[0.05] bg-neutral-900 transition-all duration-1000"
          >
            {/* 圖片層 */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover img-zoom opacity-40 group-hover:opacity-100 transition-all duration-[2.5s] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/90 opacity-80 group-hover:opacity-50 transition-opacity duration-1000" />
            </div>

            {/* 懸浮裝飾邊框 */}
            <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-1000 pointer-events-none m-6" />

            {/* 文字與資訊 */}
            <div className="absolute inset-0 p-10 md:p-14 flex flex-col justify-between z-20">
              <div className="flex justify-end items-start opacity-30 group-hover:opacity-100 transition-all duration-700">
                <div className="w-[1px] h-6 bg-white/20 transform origin-top group-hover:scale-y-150 transition-transform duration-1000" />
              </div>

              <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-1000 ease-out">
                <h3 className="text-xl md:text-2xl font-serif text-white/90 tracking-[0.15em] font-light leading-tight mb-4">
                  {image.title}
                </h3>
                <p className="text-[9px] text-white/40 tracking-[0.5em] uppercase font-light italic group-hover:text-amber-500/60 transition-colors duration-700">
                  {image.subtitle}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 進度控制條 */}
      <div className="mt-8 max-w-[1400px] mx-auto px-10 flex items-center justify-center">
        <div className="flex gap-6 items-center">
           <div className="flex gap-2 h-[1px] items-center">
              {images.slice(0, 6).map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => {
                    const scrollTarget = i * (window.innerWidth < 768 ? (window.innerWidth * 0.85 + 32) : 528);
                    scrollRef.current?.scrollTo({ left: scrollTarget, behavior: 'smooth' });
                  }}
                  className={`h-full transition-all duration-700 ${activeIndex === i ? 'w-12 bg-amber-500/80' : 'w-4 bg-white/5 hover:bg-white/10'}`} 
                />
              ))}
           </div>
        </div>
      </div>
    </section>
  );
};
