"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import ProductImage1 from "../assets/Images/ProductImage1.png";
import ProductImage2 from "../assets/Images/ProductImage2.png";
import ProductImage3 from "../assets/Images/ProductImage3.png";

// Helper to wrap index
function wrapIndex(idx: number, length: number) {
  return ((idx % length) + length) % length;
}

const slides = [
  {
    id: 1,
    src: ProductImage1,
    alt: "Image 1",
    client: "Client 1",
    location: "Dubai, United Arab Emirates",
  },
  {
    id: 2,
    src: ProductImage2,
    alt: "Image 2",
    client: "Client 2",
    location: "Abu Dhabi, United Arab Emirates",
  },
  {
    id: 3,
    src: ProductImage3,
    alt: "Image 3",
    client: "Client 3",
    location: "Sharjah, United Arab Emirates",
  },
];

const CARD_WIDTH = 320; // px, adjust for your design
const CONTAINER_WIDTH = 1440; // px, adjust for your design
const HIDE_PART = CARD_WIDTH * 0.2; // Hide 2/3 of the side cards

const positions = [
  { left: -HIDE_PART, rotate: -12, scale: 0.9, opacity: 0.8, zIndex: 2 }, // left
  {
    left: (CONTAINER_WIDTH - CARD_WIDTH) / 2,
    rotate: 0,
    scale: 1,
    opacity: 1,
    zIndex: 3,
  }, // center
  {
    left: CONTAINER_WIDTH - CARD_WIDTH + HIDE_PART,
    rotate: 12,
    scale: 0.9,
    opacity: 0.8,
    zIndex: 2,
  }, // right
];

export default function ProductSlider() {
  const [page, setPage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const activeIndex = wrapIndex(page, slides.length);

  // Always get the previous, current, and next slides for left, center, right
  const leftIndex = wrapIndex(activeIndex - 1, slides.length);
  const centerIndex = activeIndex;
  const rightIndex = wrapIndex(activeIndex + 1, slides.length);

  const visibleSlides = [
    slides[leftIndex], // left
    slides[centerIndex], // center
    slides[rightIndex], // right
  ];

  const goToPrev = () => setPage((prev) => prev - 1);
  const goToNext = () => setPage((prev) => prev + 1);

  return (
    <section className="flex flex-col items-center py-12 bg-white">
      <h2 className="text-3xl font-semibold mb-2">Quality Products</h2>
      <p className="max-w-xl text-center text-gray-500 mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <div
        className="relative h-[620px] w-full max-w-[1440px] mx-auto overflow-hidden"
        style={{ width: `${CONTAINER_WIDTH}px` }}
      >
        {/* Always render three cards in the same order/positions */}
        {visibleSlides.map((slide, idx) => {
          const pos = positions[idx];
          return (
            <motion.div
              key={slide.id}
              animate={{
                left: pos.left,
                top: "50%",
                x: 0,
                y: "-50%",
                rotate: pos.rotate,
                scale: pos.scale,
                opacity: pos.opacity,
                zIndex: pos.zIndex,
                transition: { type: "spring", stiffness: 300, damping: 30 },
              }}
              className="absolute h-[70vh] w-[50vh]"
              style={{ pointerEvents: idx === 1 ? "auto" : "none" }}
              drag={idx === 1 ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.8}
              onDragEnd={(_, info) => {
                if (idx === 1) {
                  if (info.offset.x < -100) goToNext();
                  else if (info.offset.x > 100) goToPrev();
                }
              }}
            >
              <div className="relative h-full w-full overflow-hidden ">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover "
                  priority={idx === 1}
                />
                {/* Drag Overlay */}
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="w-full flex justify-center items-center flex-col gap-2">
        <h4 className="text-lg font-semibold">{slides[activeIndex].client}</h4>
        <p className="text-gray-500">{slides[activeIndex].location}</p>
      </div>
    </section>
  );
}
