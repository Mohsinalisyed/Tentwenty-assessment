import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Slide } from '@/types/banner';

interface BannerNavigationProps {
  currentSlide: Slide;
  progress: number;
  isHovered: boolean;
  onNext: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const BannerNavigation = ({
  currentSlide,
  progress,
  isHovered,
  onNext,
  onMouseEnter,
  onMouseLeave,
}: BannerNavigationProps) => (
  <div className="absolute left-[24px] md:left-[135px] bottom-[5%] -translate-y-1/2 flex flex-col gap-4 z-10">
    <div className="relative">
      <div className="p-4 relative">
        <div 
          className="absolute inset-0"
          style={{
            background: `conic-gradient(
              from -43deg,
              white ${progress * 3.6}deg,
              rgba(255, 255, 255, 0.5) ${progress * 3.6}deg
            )`,
            mask: 'linear-gradient(#eee 0 0) content-box, linear-gradient(#eee 0 0)',
            maskComposite: 'exclude',
            padding: '1px',
          }}
        />
        <button
          onClick={onNext}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="w-20 h-20 rounded-lg overflow-hidden group relative"
        >
          <Image
            src={currentSlide.image}
            alt={currentSlide.title}
            width={93}
            height={93}
            className="object-cover w-full h-full"
          />
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 cursor-pointer bg-black/50 flex items-center justify-center rounded-lg"
              >
                <span className="text-white font-medium">Next</span>
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  </div>
); 