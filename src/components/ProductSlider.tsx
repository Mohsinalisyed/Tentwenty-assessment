"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import ProductImage1 from "../assets/Images/ProductImage1.png";
import ProductImage2 from "../assets/Images/ProductImage2.png";
import ProductImage3 from "../assets/Images/ProductImage3.png";

const images = [
  { src: ProductImage1, alt: "Image 1" },
  { src: ProductImage2, alt: "Image 2" },
  { src: ProductImage3, alt: "Image 3" },
];

export default function CurvedCarousel() {
  const [[index, direction], setIndex] = useState([0, 0]);
  const [isHovering, setIsHovering] = useState(false);

  const paginate = (newDirection: number) => {
    setIndex(([prev]) => [
      (prev + newDirection + images.length) % images.length,
      newDirection,
    ]);
  };

  const getImage = (offset: number) =>
    images[(index + offset + images.length) % images.length];

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 text-center bg-white">
      <h2 className="text-3xl font-bold mb-4">Quality Products</h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div
        className="w-full overflow-hidden flex justify-center"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="relative w-[800px] h-80">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              className="absolute top-0 left-0 w-full h-full flex items-center justify-center gap-6"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, info) => {
                if (info.offset.x < -100) paginate(1);
                else if (info.offset.x > 100) paginate(-1);
              }}
            >
              {/* Left Image */}
              <div className="w-40 h-60 transform -rotate-12 hidden md:block">
                <Image
                  src={getImage(-1).src}
                  alt={getImage(-1).alt}
                  width={160}
                  height={220}
                  className="rounded-xl object-cover shadow-md"
                />
              </div>

              {/* Center Image */}
              <div className="relative w-60 h-80 rounded-xl shadow-xl overflow-hidden">
                <Image
                  src={getImage(0).src}
                  alt={getImage(0).alt}
                  fill
                  className="object-cover rounded-xl"
                />
                {isHovering && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white font-medium">
                    Drag
                  </div>
                )}
              </div>

              {/* Right Image */}
              <div className="w-40 h-60 transform rotate-12 hidden md:block">
                <Image
                  src={getImage(1).src}
                  alt={getImage(1).alt}
                  width={160}
                  height={220}
                  className="rounded-xl object-cover shadow-md"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Client Info */}
      <div className="mt-10">
        <h4 className="text-lg font-semibold">Client 1</h4>
        <p className="text-gray-500">Dubai, United Arab Emirates</p>
      </div>
    </section>
  );
}
