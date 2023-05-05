import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addToCartHelper } from "../../commonHelpers/addToCart.helper";
import { addSingleProduct } from "../../Redux/features/getallproductSlice";
import { getsingleProduct } from "../../service/api";
import ProductQuickView from "../modal/ProductQuickView";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import slugify from "slugify";
import { addToCartByReduxHelper } from "../../commonHelpers/addToByRedux";
import { addFavouriteItem } from "../../Redux/features/cartSlice";

export default function SingleProductCard({ product }) {
  const navigate = useNavigate();
  const [clickedProductId, setClickedProductId] = useState(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { favouriteList } = useSelector((store) => store.cartReducer);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getsingleProduct(clickedProductId)
      .then((res) => {
        //  console.log('single product*****************',res.data)
        dispatch(addSingleProduct(res.data));
      })
      .catch((err) => {
        console.log("error");
      });
  }, [clickedProductId]);
  return (
    <>
      <div
        className="col-sm-6 col-lg-4"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // setClickedProductId(product.productId)
          setTimeout(() => {
            navigate(
              `/${slugify(product.Subcategory?.sub_categoryName)}/${slugify(
                product.productName
              )}/${product.productId}`
            );
          }, 100);
        }}
      >
        <div className="product mb-0">
          <div className="product-thumb-info border-0 mb-3">
            <div className="product-thumb-info-badges-wrapper">
              <span className="badge badge-ecommerce badge-success">NEW</span>
            </div>
            <div className="addtocart-btn-wrapper">
              <a
                href={`/${slugify(
                  product.Subcategory?.sub_categoryName || ""
                )}/${slugify(product.productName || "")}/${product.productId}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // addToCartHelper(product, token, cartData,dispatch,user,toast)
                  addToCartByReduxHelper(product, dispatch);
                }}
                className="text-decoration-none addtocart-btn"
                title="Add to Cart"
              >
                <i className="icons icon-bag" />
              </a>
            </div>
            <a
              href=""
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setClickedProductId(product.productId);
                setShow(true);
              }}
              className="quick-view text-uppercase font-weight-semibold text-2"
            >
              QUICK VIEW
            </a>
            <a href="#" onClick={(e) => e.preventDefault()}>
              <div className="product-thumb-info-image  ">
                <img
                  alt="product image"
                  className="img-fluid"
                  src={`${process.env.REACT_APP_BASE_URL}${product.productImages[0].filename}`}
                  style={{objectFit:'contain', maxWidth:'100%',height:'auto'}}
                 
                />
              </div>
            </a>
          </div>
          <div className="d-flex justify-content-between">
            <div>
              <a
                href={`/${slugify(
                  product.Subcategory?.sub_categoryName || ""
                )}/${slugify(product.productName || "")}/${product.productId}`}
                onClick={(e) => e.preventDefault()}
                className="d-block text-uppercase text-decoration-none text-color-default text-color-hover-primary line-height-1 text-0 mb-1"
              >
                {product?.Subcategory?.sub_categoryName}
              </a>
              <h3 className="text-3-5 font-weight-medium font-alternative text-transform-none line-height-3 mb-0">
                <a
                  href={`/${slugify(
                    product.Subcategory?.sub_categoryName || ""
                  )}/${slugify(product.productName || "")}/${
                    product.productId
                  }`}
                  className="text-color-dark text-color-hover-primary"
                >
                  {product.productName}
                </a>
              </h3>
            </div>
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
              ₹{product.productDiscontPrice}
            </span>
            <span className="amount"> ₹ {product.productPrice}</span>
          </p>
        </div>
      </div>

      <ProductQuickView show={show} handleClose={handleClose} />
    </>
  );
}
