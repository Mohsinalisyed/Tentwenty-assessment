import { motion } from 'framer-motion';
import Image from 'next/image';
import { Slide } from '@/types/banner';
import { ANIMATION_DURATION } from '@/constants/banner';

interface BannerSlideProps {
  slide: Slide;
  index: number;
  previousSlide?: Slide;
}

export const BannerSlide = ({ slide, index, previousSlide }: BannerSlideProps) => (
  <div className="absolute inset-0">
    {/* Previous slide as static background */}
    {previousSlide && (
      <div className="absolute inset-0">
        <Image
          src={previousSlide.image}
          alt={previousSlide.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>
    )}
    
    {/* Current slide with original animation */}
    <motion.div
      key={index}
      initial={{ height: '100px', opacity: 0.5 }}
      animate={{ height: '100%', opacity: 1 }}
      transition={{ duration: ANIMATION_DURATION, ease: 'easeInOut' }}
      className="absolute inset-x-0 top-1/2 -translate-y-1/2"
    >
      <Image
        src={slide.image}
        alt={slide.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
    </motion.div>
  </div>
); 