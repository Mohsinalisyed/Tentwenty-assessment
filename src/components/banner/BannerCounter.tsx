interface BannerCounterProps {
  currentSlide: number;
  totalSlides: number;
}

export const BannerCounter = ({ currentSlide, totalSlides }: BannerCounterProps) => {
  const currentNumber = String(currentSlide + 1).padStart(2, '0');
  const totalNumber = String(totalSlides).padStart(2, '0');

  return (
    <div className="absolute left-[306px] bottom-[20%] flex items-center gap-4 text-white">
      <span className="text-2xl font-medium">{currentNumber}</span>
      <div className="w-[103px] h-[1px] bg-white"></div>
      <span className="text-2xl font-medium">{totalNumber}</span>
    </div>
  );
}; 