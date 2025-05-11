"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProductImage1 from "../assets/Images/ProductImage1.png";
import ProductImage2 from "../assets/Images/ProductImage2.png";
import ProductImage3 from "../assets/Images/ProductImage3.png";

// Helper to wrap index
function wrapIndex(idx: number, length: number) {
  return ((idx % length) + length) % length;
}

const slides = [
  { src: ProductImage1, alt: "Image 1", client: "Client 1", location: "Dubai, United Arab Emirates" },
  { src: ProductImage2, alt: "Image 2", client: "Client 2", location: "Abu Dhabi, United Arab Emirates" },
  { src: ProductImage3, alt: "Image 3", client: "Client 3", location: "Sharjah, United Arab Emirates" },
];

const CARD_GAP = 320; // Increased gap for wider spread

const variants = {
  center: {
    x: "-50%",
    rotate: 0,
    scale: 1,
    opacity: 1,
    zIndex: 3,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  left: {
    x: `calc(-130% - ${CARD_GAP / 2}px)`,
    rotate: -12,
    scale: 0.9,
    opacity: 0.8,
    zIndex: 2,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  right: {
    x: `calc(30% + ${CARD_GAP / 2}px)`,
    rotate: 12,
    scale: 0.9,
    opacity: 0.8,
    zIndex: 2,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
  hidden: {
    opacity: 0,
    zIndex: 1,
    transition: { duration: 0.3 },
  },
};

export default function ProductSlider() {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => prev + 1);
      setDirection(1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeIndex = wrapIndex(page, slides.length);

  // Get the three visible slides
  const visibleSlides = [-1, 0, 1].map(
    (offset) => slides[wrapIndex(activeIndex + offset, slides.length)]
  );

  const goToPrev = () => {
    setPage((prev) => prev - 1);
    setDirection(-1);
  };
  const goToNext = () => {
    setPage((prev) => prev + 1);
    setDirection(1);
  };

  return (
    <section className="flex flex-col items-center py-12 bg-white">
      <h2 className="text-3xl font-semibold mb-2">Quality Products</h2>
      <p className="max-w-xl text-center text-gray-500 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      </p>
      <div className="relative h-[400px] w-full max-w-[1440px] flex items-center justify-between mx-auto">
        {/* Left Arrow */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full shadow p-2"
          aria-label="Previous"
        >
          <span className="text-2xl">&#8592;</span>
        </button>
        {/* Right Arrow */}
        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white rounded-full shadow p-2"
          aria-label="Next"
        >
          <span className="text-2xl">&#8594;</span>
        </button>
        <div>
          <AnimatePresence initial={false} custom={direction}>
            {visibleSlides.map((slide, idx) => (
              <motion.div
                key={slide.alt + idx + page}
                custom={direction}
                variants={variants}
                initial="hidden"
                animate={idx === 1 ? "center" : idx === 0 ? "left" : "right"}
                exit="hidden"
                className="absolute top-1/2 left-1/2 h-80 w-60 md:h-96 md:w-72 origin-center -translate-y-1/2"
                style={{
                  zIndex: idx === 1 ? 30 : 10,
                  cursor: idx === 1 ? "grab" : "default",
                }}
                drag={idx === 1 ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.8}
                onDragEnd={(_, info) => {
                  if (idx === 1) {
                    if (info.offset.x < -100) goToNext();
                    else if (info.offset.x > 100) goToPrev();
                  }
                }}
                onHoverStart={() => idx === 1 && setIsHovering(true)}
                onHoverEnd={() => idx === 1 && setIsHovering(false)}
              >
                <div className="relative h-full w-full overflow-hidden rounded-2xl shadow-2xl">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    className="object-cover rounded-2xl"
                    priority={idx === 1}
                  />
                  {/* Drag Overlay */}
                  {idx === 1 && isHovering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white font-medium text-xl rounded-2xl pointer-events-none">
                      drag
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <div className="mt-10">
        <h4 className="text-lg font-semibold">{slides[activeIndex].client}</h4>
        <p className="text-gray-500">{slides[activeIndex].location}</p>
      </div>
    </section>
  );
}
