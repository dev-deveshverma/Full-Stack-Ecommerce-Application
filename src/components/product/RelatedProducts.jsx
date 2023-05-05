import React, { useEffect, useState } from 'react'
import CommonSwiperSlider from '../../Slider/CommonSwiperSlider'
import RelatedProductSlider from '../../Slider/RelatedProductSlider'
import { getallProducts } from '../../service/api';
import { useSelector } from 'react-redux';

export default function RelatedProducts({related,id}) {
  
  return (
    <>
 <div className="row">
  <div className="col">
    <h4 className="font-weight-semibold text-4 mb-3">RELATED PRODUCTS</h4>
    <hr className="mt-0" />
    <div className="products row">
      <div className="col">
        <div className='nav-style-1 nav-outside nav-outside nav-dark mb-0'>
        <RelatedProductSlider related={related} id={id}/>
        </div>
       
      </div>
     </div>
     </div>
    </div>
    </>
  )
}
