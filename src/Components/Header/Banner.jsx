import React from 'react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

import Slide1 from '../Slider/Slide1';
import Slide2 from '../Slider/Slide2';
import Slide3 from '../Slider/Slide3';

const Banner = () => {
  return (
    <div className='mt-10'>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={() => console.log('slide change')}
      >
        <SwiperSlide> 
           <div className="w-full h-full">
               <Slide1 />
          </div>
       </SwiperSlide>
       <SwiperSlide> 
       <div className="w-10/12 mx-auto h-full">
               <Slide2 />
          </div>
       </SwiperSlide>
       <SwiperSlide> 
       <div className="w-10/12 mx-auto h-full">
               <Slide3 />
          </div>
       </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
