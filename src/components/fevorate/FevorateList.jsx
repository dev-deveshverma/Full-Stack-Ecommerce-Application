import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";
import { addToCartByReduxHelper } from "../../commonHelpers/addToByRedux";
import { addToCartHelper } from "../../commonHelpers/addToCart.helper";
import { isItemPresentInCart } from "../../commonHelpers/checkItemPresent";
import { deleteFavouriteItem } from "../../Redux/features/cartSlice";

export default function FevorateList() {
  const { favouriteList,cartData } = useSelector((store) => store.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div>
      {favouriteList.length ? (
        <>
          <div
            role="main"
            className="main  shop pb-4"
            style={{ marginTop: "12rem" }}
          >
            <div className="container">
              <div className="row pb-4 mb-5">
                <div className="col-lg-12 mb-5 mb-lg-0">
                  <form method="post" action>
                    <div className="table-responsive">
                      <table className="shop_table cart">
                        <thead>
                          <tr className="text-color-dark">
                            <th className="product-thumbnail" width="15%">
                              &nbsp;
                            </th>
                            <th
                              className="product-name text-uppercase"
                              width="30%"
                            >
                              Product
                            </th>
                            <th
                              className="product-price text-uppercase"
                              width="20%"
                            >
                              Price
                            </th>
                            <th
                              className="product-quantity text-uppercase"
                              width="20%"
                            >
                              View
                            </th>
                            <th
                              className="product-subtotal text-uppercase  text-center"
                              minWidth="30%"
                            >
                              Add
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {favouriteList.map((product, index) => {
                            return (
                              <tr
                                className="cart_table_item"
                                key={product.productId}
                              >
                                <td className="product-thumbnail">
                                  <div className="product-thumbnail-wrapper">
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        dispatch(
                                          deleteFavouriteItem(product.productId)
                                        );
                                      }}
                                      className="product-thumbnail-remove"
                                      title="Remove Product"
                                    >
                                      <i className="fas fa-times" />
                                    </a>
                                    <a
                                      href="shop-product-sidebar-right.html"
                                      className="product-thumbnail-image"
                                      title={`${product.productName}`}
                                    >
                                      <img
                                        width={150}
                                        height={150}
                                        alt=""
                                        className="img-fluid"
                                        src={`${process.env.REACT_APP_BASE_URL}${product.productImages[0]?.filename}`}
                                      />
                                    </a>
                                  </div>
                                </td>
                                <td className="product-name">
                                  <a
                                    href={`/${slugify(
                                      product.Subcategory?.sub_categoryName ||
                                        ""
                                    )}/${slugify(product.productName || "")}/${
                                      product.productId
                                    }`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      navigate(
                                        `/${slugify(
                                          product.Subcategory
                                            ?.sub_categoryName || ""
                                        )}/${slugify(
                                          product.productName || ""
                                        )}/${product.productId}`
                                      );
                                    }}
                                    className="font-weight-semi-bold text-color-dark text-color-hover-primary text-decoration-none"
                                  >
                                    {product.productName}
                                  </a>
                                </td>
                                <td className="product-price">
                                  <span className="amount font-weight-medium text-color-grey">
                                    ₹{product.productDiscontPrice}
                                  </span>
                                </td>
                                <td className="product-quantity">
                                  <Link
                                    to={`/${slugify(
                                      product.Subcategory?.sub_categoryName ||
                                        ""
                                    )}/${slugify(product.productName || "")}/${
                                      product.productId
                                    }`}
                                  >
                                    See Product
                                  </Link>
                                </td>
                                <td className="product-subtotal text-end">
                                {
                                  isItemPresentInCart(product.productId,cartData).length?  <button
                                  type="submit"
                                  className="btn btn-dark btn-modern text-uppercase bg-color-hover-primary border-color-hover-primary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    navigate('/cart')
                                  }}
                                >
                                  View in Cart
                                </button>:  <button
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
                                }
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="container p-3" style={{ marginTop: "12rem" }}>
          <p className="text-center display-1">No favourite item ?</p>
        </div>
      )}
    </div>
  );
}
