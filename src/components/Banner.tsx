"use client";

import { useState, useEffect, useRef } from "react";
import { slides, SLIDE_DURATION } from "@/constants/banner";
import { BannerSlide } from "./banner/BannerSlide";
import { BannerContent } from "./banner/BannerContent";
import { BannerNavigation } from "./banner/BannerNavigation";
import { BannerCounter } from "./banner/BannerCounter";

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState<typeof slides[0] | undefined>(undefined);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    let animationFrame: number;

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTimeRef.current;
      const newProgress = Math.min((elapsed / SLIDE_DURATION) * 100, 100);
      
      setProgress(newProgress);

      if (newProgress < 100) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        setPreviousSlide(slides[currentSlide]);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setProgress(0);
        startTimeRef.current = Date.now();
        animationFrame = requestAnimationFrame(updateProgress);
      }
    };

    animationFrame = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [currentSlide]);

  const handleNext = () => {
    setPreviousSlide(slides[currentSlide]);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
    startTimeRef.current = Date.now();
  };

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <BannerSlide 
        slide={slides[currentSlide]} 
        index={currentSlide}
        previousSlide={previousSlide}
      />

      <div className="absolute inset-0">
        <div className="max-w-[1440px] mx-auto h-full relative">
          <div className="absolute h-full flex items-center pl-[24px] md:pl-[135px]">
            <BannerContent slide={slides[currentSlide]} index={currentSlide} />
          </div>

          <BannerNavigation
            currentSlide={slides[currentSlide]}
            progress={progress}
            isHovered={isHovered}
            onNext={handleNext}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />

          <BannerCounter 
            currentSlide={currentSlide}
            totalSlides={slides.length}
          />
        </div>
      </div>
    </div>
  );
}
