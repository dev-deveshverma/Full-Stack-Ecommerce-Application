import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToCartHelper } from "../../commonHelpers/addToCart.helper";
import { addSingleProduct } from "../../Redux/features/getallproductSlice";
import { getallProducts, getsingleProduct } from "../../service/api";
import SwiperSlider from "../../Slider/SwiperSlider";
import ProductDetailTabs from "../Tabs/ProductDetailTabs";
import BestSellingProduct from "./BestSellingProduct";
import FeaturedProduct from "./FeaturedProduct";
import LatestProduct from "./LatestProduct";
import RelatedProducts from "./RelatedProducts";
import TopRatedProduct from "./TopRatedProduct";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { fontWeight } from "@mui/system";
import { addToCartByReduxHelper } from "../../commonHelpers/addToByRedux";
import {
  isItemPresentInCart,
  isItemPresentInFavoruiteList,
} from "../../commonHelpers/checkItemPresent";
import { addFavouriteItem } from "../../Redux/features/cartSlice";
import slugify from "slugify";
export default function SingleProductDetails() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  const { singleProduct } = useSelector((store) => store.getallproductReducer);
  const { cartData, favouriteList } = useSelector((store) => store.cartReducer);
  const { token, user } = useSelector((store) => store.loginReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getsingleProduct(id)
      .then((res) => {
        dispatch(addSingleProduct(res.data));
        setProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const sub_categoryName = useSelector(
    (store) =>
      store.getallproductReducer?.singleProduct?.Subcategory?.sub_categoryName
  );
  const [related, setRelated] = useState();
  const getrelateddata = async () => {
    try {
      const res = await getallProducts(sub_categoryName);
      setRelated(res?.data[0]?.Products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getrelateddata();
  }, [sub_categoryName]);

  console.log("relteddata", related);

  console.log(product);
  return (
    <>
      <div role="main" class="main shop pt-4" style={{ marginTop: "12rem" }}>
        <div className="container">
          {/* <div class="row">
						<div class="col">
							<ul class="breadcrumb breadcrumb-style-2 d-block text-4 mb-4">
								<li><a href="#" class="text-color-default text-color-hover-primary text-decoration-none">Home</a></li>
								<li><a href="#" class="text-color-default text-color-hover-primary text-decoration-none">Electronics</a></li>
								<li>SMARTWATCHES</li>
							</ul>
						</div>
					</div> */}

          <div className="row">
            <div className="col-md-5 mb-5 mb-md-0">
              <SwiperSlider />
            </div>
            <div className="col-md-7">
              <div className="summary entry-summary position-relative">
                <div className="position-absolute top-0 right-0">
                  {/* 
                  <div className="products-navigation d-flex">
                    <a
                      href="#"
                      className="prev text-decoration-none text-color-dark text-color-hover-primary border-color-hover-primary"
                      data-bs-toggle="tooltip"
                      data-bs-animation="false"
                      data-bs-original-title="Red Ladies Handbag"
                    >
                      <i className="fas fa-chevron-left" />
                    </a>
                    <a
                      href="#"
                      className="next text-decoration-none text-color-dark text-color-hover-primary border-color-hover-primary"
                      data-bs-toggle="tooltip"
                      data-bs-animation="false"
                      data-bs-original-title="Green Ladies Handbag"
                    >
                      <i className="fas fa-chevron-right" />
                    </a>
                  </div> */}
                </div>
                <h1 className="mb-0 font-weight-bold text-7">
                  {singleProduct.productName}
                </h1>
                <div className="pb-0 clearfix d-flex align-items-center">
                  <div title="Rated 3 out of 5" className="float-start">
                    <input
                      type="text"
                      className="d-none"
                      defaultValue={3}
                      title
                      data-plugin-star-rating
                      data-plugin-options="{'displayOnly': true, 'color': 'primary', 'size':'xs'}"
                    />
                  </div>
                  <div className="review-num">
                    <a
                      href="#description"
                      className="text-decoration-none text-color-default text-color-hover-primary"
                      data-hash
                      data-hash-offset={0}
                      data-hash-offset-lg={75}
                      data-hash-trigger-click=".nav-link-reviews"
                      data-hash-trigger-click-delay={1000}
                    >
                      <span
                        className="count text-color-inherit"
                        itemProp="ratingCount"
                      >
                        <span style={{ color: "red", fontWeight: "bold" }}>
                          {singleProduct.productBrand}
                        </span>
                        {"    "}
                      </span>{" "}
                    </a>
                  </div>
                </div>
                <div className="divider divider-small">
                  <hr className="bg-color-grey-scale-4" />
                </div>
                <span className="amount">
                  <del>₹ {singleProduct.productPrice}</del>
                </span>
                <p className="price mb-3">
                  <span className="amount">
                    ₹ {singleProduct.productDiscontPrice}
                  </span>
                </p>

                <p className="text-3-5 mb-3">
                  {singleProduct.productDescription}
                </p>
                <ul className="list list-unstyled text-2">
                  <li className="mb-0">
                    AVAILABILITY:{" "}
                    <strong className="text-color-dark">AVAILABLE</strong>
                  </li>
                  <li className="mb-0">
                    SKU: <strong className="text-color-dark">1234567890</strong>
                  </li>
                </ul>
                <form
                  encType="multipart/form-data"
                  method="post"
                  className="cart"
                  action="shop-cart.html"
                >
                  <table
                    className="table table-borderless"
                    style={{ "max-width": "300px" }}
                  >
                    <tbody>
                      <tr>
                        <td className="align-middle text-2 px-0 py-2">SIZE:</td>
                        <td className="px-0 py-2">
                          <div className="custom-select-1">
                            <select
                              name="size"
                              className="form-control form-select text-1 h-auto py-2"
                            >
                              <option value>PLEASE CHOOSE</option>
                              <option value="blue">Small</option>
                              <option value="red">Normal</option>
                              <option value="green">Big</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td className="align-middle text-2 px-0 py-2">
                          COLOR:
                        </td>
                        <td className="px-0 py-2">
                          <div className="custom-select-1">
                            <select
                              name="color"
                              className="form-control form-select text-1 h-auto py-2"
                            >
                              <option value>PLEASE CHOOSE</option>
                              <option value="blue">Blue</option>
                              <option value="red">Red</option>
                              <option value="green">Green</option>
                            </select>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <hr />
                  <div className="quantity quantity-lg">
                    {/* <input
                      type="button"
                      className="minus text-color-hover-light bg-color-hover-primary border-color-hover-primary"
                      defaultValue="-"
                    />
                    <input
                      type="text"
                      className="input-text qty text"
                      title="Qty"
                      defaultValue={1}
                      name="quantity"
                      min={1}
                      step={1}
                    />
                    <input
                      type="button"
                      className="plus text-color-hover-light bg-color-hover-primary border-color-hover-primary"
                      defaultValue="+"
                    /> */}
                  </div>
                  {isItemPresentInCart(product.productId, cartData).length ? (
                    <button
                      type="submit"
                      className="btn btn-dark btn-modern text-uppercase bg-color-hover-primary border-color-hover-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate("/cart");
                      }}
                    >
                      View in Cart
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-dark btn-modern text-uppercase bg-color-hover-primary border-color-hover-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        addToCartByReduxHelper(product, dispatch);
                      }}
                    >
                      Add to cart
                    </button>
                  )}
                  <hr />
                </form>
                <div className="d-flex align-items-center">
                  {isItemPresentInFavoruiteList(
                    product.productId,
                    favouriteList
                  ).length ? (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        navigate("/user/fevorate");
                      }}
                      href=""
                      className="d-flex align-items-center text-decoration-none text-color-dark text-color-hover-primary font-weight-semibold text-2"
                    >
                      <i className="far fa-heart me-1 text-color-danger" /> See
                      Wishlist
                    </a>
                  ) : (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        dispatch(addFavouriteItem(singleProduct));
                      }}
                      href={`/${slugify(
                        singleProduct.Subcategory?.sub_categoryName || ""
                      )}/${slugify(singleProduct.productName || "")}/${
                        singleProduct.productId
                      }`}
                      className="d-flex align-items-center text-decoration-none text-color-dark text-color-hover-primary font-weight-semibold text-2"
                    >
                      <i className="far fa-heart me-1" /> SAVE TO WISHLIST
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          <ProductDetailTabs />

          <RelatedProducts related={related} id={id} />

          <div>
            <hr className="my-5" />
            <div className="products row">
              <FeaturedProduct />
              <BestSellingProduct />
              <LatestProduct />
              <TopRatedProduct />
            </div>
          </div>
        </div>
      </div>
      {/* <ToastContainer/> */}
    </>
  );
}

{
  /* <ul className="social-icons social-icons-medium social-icons-clean-with-border social-icons-clean-with-border-border-grey social-icons-clean-with-border-icon-dark me-3 mb-0">
{/* Facebook */
}
<li className="social-icons-facebook">
  <a
    href=""
    onClick={(e) => e.preventDefault()}
    target="_blank"
    data-bs-toggle="tooltip"
    data-bs-animation="false"
    data-bs-placement="top"
    title="Share On Facebook"
  >
    <i className="fab fa-facebook-f" />
  </a>
</li>;
{
  /* Google+ */
}
<li className="social-icons-googleplus">
  <a
    href="#"
    onClick={(e) => e.preventDefault()}
    target="_blank"
    data-bs-toggle="tooltip"
    data-bs-animation="false"
    data-bs-placement="top"
    title="Share On Google+"
  >
    <i className="fab fa-google-plus-g" />
  </a>
</li>;
{
  /* Twitter */
}
<li className="social-icons-twitter">
  <a
    href="#"
    onClick={(e) => e.preventDefault()}
    target="_blank"
    data-bs-toggle="tooltip"
    data-bs-animation="false"
    data-bs-placement="top"
    title="Share On Twitter"
  >
    <i className="fab fa-twitter" />
  </a>
</li>;
{
  /* Email */
}
<li className="social-icons-email">
  <a
    href="#"
    onClick={(e) => e.preventDefault()}
    data-bs-toggle="tooltip"
    data-bs-animation="false"
    data-bs-placement="top"
    title="Share By Email"
  >
    <i className="far fa-envelope" />
  </a>
</li>;
// </ul> */}
