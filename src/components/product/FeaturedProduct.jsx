import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function FeaturedProduct() {
  
  const { product } = useSelector((store) => store.getallproductReducer);
  const navigate= useNavigate()
  return (
    <>
    <div className="col-md-6 col-lg-3">
      <h4 className="font-weight-semibold text-4 mb-3">FEATURED PRODUCTS</h4>
     {
      product && product.slice(-4).map((productItem)=>{
        return <>
         <div className="product row row-gutter-sm align-items-center mb-4" onClick={(e)=>{
         e.preventDefault()
         e.stopPropagation();
          // setClickedProductId(product.productId)
          setTimeout(() => {
         navigate(`/product/product-description/${productItem.productId}`)
            
          }, 1000);
      }}>
        <div className="col-5 col-md-12 col-lg-5">
          <div className="product-thumb-info border-0">
            <a href="shop-product-sidebar-left.html">
              <div className="product-thumb-info-image">
                <img alt className="img-fluid" src={`${process.env.REACT_APP_BASE_URL}/${productItem.productImages[0]?.filename}`} />
              </div>
            </a>
          </div>
        </div>
        <div className="col-7 col-md-12 col-lg-7 ms-md-0 ms-lg-0 ps-lg-1 pt-1">
          <a href="#" className="d-block text-uppercase text-decoration-none text-color-default text-color-hover-primary line-height-1 text-0 mb-2">{productItem.Subcategory?.sub_categoryName}</a>
          <h3 className="text-3-5 font-weight-medium font-alternative text-transform-none line-height-3 mb-0"><a href="shop-product-sidebar-right.html" className="text-color-dark text-color-hover-primary text-decoration-none">{productItem.productName}</a></h3>
          <div title="Rated 5 out of 5">
            <input type="text" className="d-none" defaultValue={5} title data-plugin-star-rating data-plugin-options="{'displayOnly': true, 'color': 'dark', 'size':'xs'}" />
          </div>
          <p className="price text-4 mb-0">
            <span className="sale text-color-dark font-weight-semi-bold">  ₹{productItem.productDiscontPrice}</span>
            <span className="amount">  ₹{productItem.productPrice}</span>
          </p>
        </div>
      </div>
        
        </>
      })
     }
      
    </div>
    </>
  )
}
