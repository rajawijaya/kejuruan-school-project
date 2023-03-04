import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, A11y } from 'swiper';	
import imageUrl from "./imageUrl.js";

import 'swiper/css';
import 'swiper/css/effect-fade';

const Hero = () => {
  return (
    <>
      <div>
        <div className="absolute top-[30%] left-[5%] text-white z-[-2] sm:top-[50%]">
          <h1 className="font-bold text-2xl sm:text-3xl">Bersama SMK</h1>
          <p className="sm:text-lg" >Jadikan Anak Bangsa Berprestasi Di Dunia Industri </p>
        </div>
        <Swiper 
          modules={[Autoplay, EffectFade, A11y]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false
          }}
          effect="fade"
          slidesPerView={1}
          loop={true}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log('slide change')}
          className=" h-[50vh] bg-sky-200 z-[-99] sm:h-[100vh]"
        >
        {
          imageUrl.map((item, i) => {
            return (
              <SwiperSlide className={` bg-cover bg-center brightness-50`} style={{backgroundImage: `url(${item})`}}></SwiperSlide>
            )
          })
        }
        </Swiper>
      </div>
    </>
  )
}

export default Hero;