import React, {
  useEffect,
  useRef,
  useState,
  createContext,
  useContext,
} from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

// ----------- CONTEXT -----------
export const CarouselContext = createContext({
  onCardClose: () => {},
  currentIndex: 0,
});

// ----------- CAROUSEL -----------
export const Carousel = ({ items, initialScroll = 0 }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // 🟢 Reduce scroll lag by throttling scroll updates
  const checkScrollability = () => {
    if (!carouselRef.current) return;
    // No state updates here = smoother scroll
  };

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll;
      checkScrollability();
    }
  }, [initialScroll]);

  const handleCardClose = (index) => {
    const cardWidth = window.innerWidth < 768 ? 230 : 384;
    const gap = window.innerWidth < 768 ? 4 : 8;

    const scrollPosition = (cardWidth + gap) * (index + 1);
    carouselRef.current?.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });

    setCurrentIndex(index);
  };

  return (
    <CarouselContext.Provider
      value={{ onCardClose: handleCardClose, currentIndex }}
    >
      <div className="relative w-full">
        <div
          ref={carouselRef}
          onScroll={checkScrollability}
          className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth py-10 md:py-20 gap-4 pl-4 [scrollbar-width:none]"
        >
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 * index }}
              className="rounded-3xl snap-start"
            >
              {item}
            </motion.div>
          ))}
        </div>
      </div>
    </CarouselContext.Provider>
  );
};
// ----------- CARD -----------
export const Card = ({ card }) => {
  const handleRedirect = () => {
    window.location.href = "/collection";
  };

  return (
    <>
      <motion.button
        onClick={handleRedirect}
        className="relative h-80 w-56 md:h-[40rem] md:w-96 overflow-hidden rounded-3xl bg-gray-200"
      >
        {/* Subtle gradient for text clarity */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40 z-20" />

        {/* TEXT BLOCK */}
        <div className="absolute bottom-6 left-6 z-30">
          <p className="text-sm md:text-base font-medium text-white opacity-90">
            {card.category}
          </p>

          <p className="text-xl md:text-3xl font-semibold text-white mt-1 leading-snug">
            {card.title}
          </p>

          {/* EXPLORE NOW BUTTON */}
          <button
            className="mt-3 px-4 py-1.5 bg-white/80 text-black text-sm font-semibold rounded-full backdrop-blur-sm hover:bg-white transition"
          >
            Explore Now →
          </button>
        </div>

        <BlurImage
          src={card.src}
          alt={card.title}
          className="absolute inset-0 object-cover w-full h-full z-10"
        />
      </motion.button>
    </>
  );
};


// ----------- BLUR IMAGE -----------
export const BlurImage = ({ src, alt, className }) => {
  const [loading, setLoading] = useState(true);

  return (
    <img
      src={src}
      alt={alt}
      onLoad={() => setLoading(false)}
      className={cn(
        "transition duration-300 will-change-transform",
        loading ? "blur-sm" : "blur-0",
        className
      )}
    />
  );
};
