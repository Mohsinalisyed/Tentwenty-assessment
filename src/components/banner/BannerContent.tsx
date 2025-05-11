import { motion, AnimatePresence } from 'framer-motion';
import { Slide } from '@/types/banner';

interface BannerContentProps {
  slide: Slide;
  index: number;
}

export const BannerContent = ({ slide }: BannerContentProps) => (
  <div className="text-white mx-auto max-w-[500px]">
    <AnimatePresence mode="wait">
      <motion.div
        key="description"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p className="text-[14px] sm:text-[16px] md:text-2xl mb-6 font-thin">
          {slide.description}
        </p>
      </motion.div>
    </AnimatePresence>
    <AnimatePresence mode="wait">
      <motion.div
        key="title"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-[32px] sm:text-[64px] md:text-6xl mb-4">{slide.title}</h1>
      </motion.div>
    </AnimatePresence>
  </div>
); 