import Slide1 from '../assets/Images/Slide_1.png';
import Slide2 from '../assets/Images/Slide_2.png';
import Slide3 from '../assets/Images/Slide_3.png';
import Slide4 from '../assets/Images/Slide_4.png';
import { Slide } from '../types/banner';

export const SLIDE_DURATION = 8000;
export const ANIMATION_DURATION = 2;

const title = "From our Farms to your hands";
const description = "Welcome To TenTwenty Farms";

export const slides: Slide[] = [
  {
    image: Slide1.src,
    title,
    description,
  },
  {
    image: Slide2.src,
    title,
    description,
  },
  {
    image: Slide3.src,
    title,
    description,
  },
  {
    image: Slide4.src,
    title,
    description,
  },
]; 