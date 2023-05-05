import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import CommonSwiperSlider from "./CommonSwiperSlider";
import { useSelector } from "react-redux";

export default function SwiperSlider({slideImages}) {
  const {singleProduct}= useSelector((store)=>store.getallproductReducer);
  const {productImages}= singleProduct
  const [thumbsSwiper, setThumbsSwiper] = useState(false);

  return (
    <>
      <CommonSwiperSlider thumbsSwiper={thumbsSwiper}  productImages={productImages}/>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
    
      >
       {
         productImages && productImages.map((imgUrl, index)=>{
           return (
            <SwiperSlide className="thumb-gallery-detail  manual nav-inside nav-style-1 nav-dark mb-3" key={index} style={{cursor:'pointer'}}>
            <img alt="" class="img-fluid" src={`${process.env.REACT_APP_BASE_URL}${imgUrl.filename}`}/>
            </SwiperSlide>
           )
         })
       }
      </Swiper>
    </>
  );
}
