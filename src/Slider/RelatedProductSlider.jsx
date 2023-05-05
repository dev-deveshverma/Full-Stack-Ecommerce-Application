import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCartByReduxHelper } from "../commonHelpers/addToByRedux";
import { FreeMode, Navigation, Thumbs } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Swiper, SwiperSlide } from "swiper/react";
import { addToCartHelper } from "../commonHelpers/addToCart.helper";
import SingleProductCard from "../components/product/SingleProductCard";
import { addFavouriteItem } from "../Redux/features/cartSlice";
import slugify from "slugify";
import { isItemPresentInFavoruiteList } from "../commonHelpers/checkItemPresent";
import { useNavigate } from "react-router-dom";
export default function RelatedProductSlider({ related ,id}) {
   const navigate=useNavigate()
  const dispatch=useDispatch()
  const {favouriteList}= useSelector(store=>store.cartReducer)
  console.log("related as a props",related)
  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#000",
          "--swiper-pagination-color": "#000",
          "--swiper-navigation-size": "15px",
      
        }}
         breakpoints={{
    // when window width is >= 640px
    640: {
      slidesPerView: 1,
    },
    // // when window width is >= 768px
    768: {
    
      slidesPerView: 4,
    },
  }}
        spaceBetween={22}
        navigation={true}
        //  slidesPerView={4}
        modules={[FreeMode, Navigation, Thumbs]}
        className=""
        
      >
        {/* //!! displaying slides of products if slideProducts has value */}
        {related?.slice(1).map((product, index) => {
           console.log("product",product)
          return (
            <SwiperSlide
              className=""
              key={index}
            >
              <div className="product mb-0">
                <div className="product-thumb-info border-0 mb-3">
                  <div className="product-thumb-info-badges-wrapper">
                    <span className="badge badge-ecommerce badge-success">
                      NEW
                    </span>
                  </div>
                  <div className="addtocart-btn-wrapper">
                    <a
                      href="#"
                      onClick={(e)=>{
                        e.preventDefault()
                        e.stopPropagation()
                    addToCartByReduxHelper(product,dispatch)
                      }}
                      className="text-decoration-none addtocart-btn"
                      title="Add to Cart"
                    >
                      <i className="icons icon-bag" />
                    </a>
                  </div>
                  {/* <a
                    href="#"
                    onClick={(e)=>e.preventDefault()}
                    className="quick-view text-uppercase font-weight-semibold text-2"
                  >
                    QUICK VIEW
                  </a> */}
                  <a  href="#"
                      onClick={(e)=>e.preventDefault()}>
                    <div className="product-thumb-info-image">
                      <img
                        alt
                        className="img-fluid"
                        src={`${process.env.REACT_APP_BASE_URL}${product.productImages[0].filename}`}
                      />
                    </div>
                  </a>
                </div>
                <div className="d-flex justify-content-between">
                  <div>
                    <a
                      href="#"
                      onClick={(e)=>e.preventDefault()}
                      className="d-block text-uppercase text-decoration-none text-color-default text-color-hover-primary line-height-1 text-0 mb-1"
                    >
                    {product.productBrand}
                    </a>
                    <h3 className="text-3-5 font-weight-medium font-alternative text-transform-none line-height-3 mb-0">
                      <a
                        href="shop-product-sidebar-right.html"
                        className="text-color-dark text-color-hover-primary"
                      >
                      {product.productName}
                      </a>
                    </h3>
                  </div>
                  <a
                    href="#"
                    className="text-decoration-none text-color-default text-color-hover-dark text-4"
                  >
                 {favouriteList.filter(
              (favouriteItem) => favouriteItem.productId === product.productId
            ).length ? (
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="text-decoration-none text-color-default text-color-hover-dark text-4"
              >
                <i className="far fa-heart text-color-danger " />
              </a>
            ) : (
              <a
                href="#"
                onClick={(e) =>{
                   e.preventDefault()
                   e.stopPropagation();
                    dispatch(addFavouriteItem(product))
                  }}
                className="text-decoration-none text-color-default text-color-hover-dark text-4"
              >
                <i className="far fa-heart " />
              </a>
            )}
                  </a>
                </div>
                <div title="Rated 5 out of 5">
                  <input
                    type="text"
                    className="d-none"
                    defaultValue={5}
                    title
                    data-plugin-star-rating
                    data-plugin-options="{'displayOnly': true, 'color': 'default', 'size':'xs'}"
                  />
                </div>
                <p className="price text-5 mb-3">
                  <span className="sale text-color-dark font-weight-semi-bold">
                  ₹ {product.productDiscontPrice}
                  </span>
                  <span className="amount">₹ {product.productPrice}</span>
                </p>
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  );
}
