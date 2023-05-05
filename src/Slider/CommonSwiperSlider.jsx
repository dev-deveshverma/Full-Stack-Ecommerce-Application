import React from 'react'
import { useSelector } from 'react-redux';

import { FreeMode, Navigation, Thumbs } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import SingleProductCard from '../components/product/SingleProductCard';
export default function CommonSwiperSlider({thumbsSwiper,productImages}) {
  
    const slideImages=[
        "https://www.okler.net/previews/porto/9.9.0/img/products/product-grey-7.jpg",
        "https://www.okler.net/previews/porto/9.9.0/img/products/product-grey-7.jpg",
        "https://www.okler.net/previews/porto/9.9.0/img/products/product-grey-7.jpg",
        "https://www.okler.net/previews/porto/9.9.0/img/products/product-grey-7.jpg",
        "https://www.okler.net/previews/porto/9.9.0/img/products/product-grey-7.jpg",
        "https://www.okler.net/previews/porto/9.9.0/img/products/product-grey-7.jpg"
      ]
  return (
   <>
    <Swiper
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-pagination-color": "#000",
          "--swiper-navigation-size": "15px"
         
        }}
        spaceBetween={10}
        navigation={true}
        thumbs={{swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null}}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 thumb-gallery-wrapper"
      >

        {/* //!! displaying slides of images if slideImages has value  */}
       {
         productImages && productImages.map((imgUrl, index)=>{
           return (
            <SwiperSlide className="thumb-gallery-detail  manual nav-inside nav-style-1 nav-dark mb-3" key={index}>
            <img alt="" class="img-fluid" src={`${process.env.REACT_APP_BASE_URL}${imgUrl.filename}`}/>
            </SwiperSlide>
           )
         })
       }

       
      </Swiper>
   </>
  )
}
