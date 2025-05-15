import { useState, useEffect, useRef } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import header1 from "../assets/1_1.png";
import header2 from "../assets/5_1.png";
import header3 from "../assets/3_1.png";
import header4 from "../assets/6_1.png";

const imageUrls = [
  {
    url: header1,
    alt: "Library professionals networking event",
  },
  {
    url: header2,
    alt: "HPLA annual conference attendees",
  },
  {
    url: header3,
    alt: "Library science workshop in progress",
  },
  {
    url: header4,
    alt: "HPLA members at cultural event",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Responsive height calculation - smaller on mobile
  const [carouselHeight, setCarouselHeight] = useState('50vh');

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 640) { // Mobile
        setCarouselHeight('40vh'); // Smaller height for phones
      } else if (window.innerWidth < 1024) { // Tablet
        setCarouselHeight('50vh');
      } else { // Desktop
        setCarouselHeight('60vh'); // Reduced from original
      }
    };

    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    resetTimeout();
    
    if (isAutoPlaying) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % imageUrls.length);
      }, 3500);
    }
    
    return () => {
      resetTimeout();
    };
  }, [current, isAutoPlaying]);

  const previousSlide = () => {
    setCurrent(current === 0 ? imageUrls.length - 1 : current - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3500);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % imageUrls.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3500);
  };

  const goToSlide = (index: number) => {
    setCurrent(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 30) { // More sensitive swipe threshold for mobile
      nextSlide();
    } else if (diff < -30) {
      previousSlide();
    }

    touchStartX.current = null;
  };

  return (
    <div 
      className="w-full overflow-hidden relative mb-2 rounded-lg bg-black"
      style={{ height: carouselHeight }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Main carousel container */}
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {imageUrls.map(({ url, alt }, index) => (
          <div 
            key={index} 
            className="w-full h-full flex-shrink-0 relative"
            aria-hidden={index !== current}
          >
            <img 
              src={url} 
              alt={alt} 
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Lighter overlay for better mobile visibility */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
        ))}
      </div>

      {/* Mobile-friendly indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center space-x-2">
        {imageUrls.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              index === current ? "bg-white w-[2rem]" : "bg-white/30"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Mobile touch buttons (always visible on small screens) */}
      <div className="sm:hidden absolute inset-0 flex items-center justify-between px-2">
        <button
          onClick={previousSlide}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
          aria-label="Previous slide"
        >
         
        </button>
        
        <button
          onClick={nextSlide}
          className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
          aria-label="Next slide"
        >
          
        </button>
      </div>
    </div>
  );
}

export default Carousel;