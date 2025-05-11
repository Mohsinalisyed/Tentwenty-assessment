interface BannerCounterProps {
  currentSlide: number;
  totalSlides: number;
}

export const BannerCounter = ({ currentSlide, totalSlides }: BannerCounterProps) => {
  const currentNumber = String(currentSlide + 1).padStart(2, '0');
  const totalNumber = String(totalSlides).padStart(2, '0');

  return (
    <div className="absolute left-[150px] md:left-[306px] bottom-[20%] flex items-center gap-4 text-white">
      <span className="text-[14px] md:text-[16px] ">{currentNumber}</span>
      <div className="w-[103px] h-[1px] bg-white"></div>
      <span className="text-[14px] md:text-[16px] ">{totalNumber}</span>
    </div>
  );
}; 