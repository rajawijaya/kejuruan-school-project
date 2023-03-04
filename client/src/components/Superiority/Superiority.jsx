
import content from "./content";
import { Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const Superiority = () => {
  
	return (
		<>
		  <div>
        <h1 className="font-bold text-3xl text-center pt-20 pb-10">Kenapa Harus SMK?</h1>
        <Swiper 
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          centeredSlides={true}
          navigation
          breakpoints={{
            768: {
              slidesPerView: 3
            }
          }}
        >
        
          {
            content.map((item, i) => {
              return (
              <SwiperSlide>
                <div className="card w-[250px] p-8 border-2 border-solid border-sky-700 rounded-xl shadow-lg shadow-sky-200 m-auto ">
                  <h1 className="card-title font-bold text-lg">{item.title}</h1>
                  <p className="card-desc">{item.desc}</p>
                </div>
                </SwiperSlide>
              )
            })
          }
        
          </Swiper>
      </div>
    </>
	)
}

export default Superiority;