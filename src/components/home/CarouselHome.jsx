import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselHome = () => {
  
  return (
    <Carousel 
      autoPlay 
      infiniteLoop
      emulateTouch={true}
      showThumbs={false} 
      showStatus={false}
    >
      {/* Slide 1 */}
      <div className='flex justify-center items-center h-[30rem] brightness-50'>
        <img src="/burger.jpg" alt="burger carousel" className="object-cover max-h-full" />
      </div>

      {/* Slide 2 */}
      <div className='flex justify-center items-center h-[30rem] brightness-50'>
        <img src="/swarma.jpg" alt="swarma carousel" className="object-cover max-h-full" />
      </div>

      {/* Slide 3 */}
      <div className='flex justify-center items-center h-[30rem] brightness-50'>
        <img src="/milkshake.jpg" alt="milkshake carousel" className="object-cover max-h-full" />
      </div>
    </Carousel>
  );
}

export default CarouselHome;
