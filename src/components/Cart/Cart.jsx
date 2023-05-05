import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { addItemInCart, decrementItemQuantity, deleteCartItem, incrementItemQuantity } from "../../Redux/features/cartSlice";
import { deleteCartItemHandler, updateCartItemHandler } from "../../service/api";

export default function () {
 const {cartData, totalDiscountedPrice}= useSelector(store=>store.cartReducer);
 const {token}= useSelector(store=>store.loginReducer);
 const dispatch= useDispatch();
 const navigate= useNavigate()

  return (
    <div>
      {cartData.length?<>
        <div role="main" className="main shop pb-4" style={{marginTop:'12rem'}}>
        <div className="container">
          <div className="row pb-4 mb-5">
            <div className="col-lg-8 mb-5 mb-lg-0">
              <form method="post" action>
                <div className="table-responsive">
                  <table className="shop_table cart">
                    <thead>
                      <tr className="text-color-dark">
                        <th className="product-thumbnail" width="15%">
                          &nbsp;
                        </th>
                        <th className="product-name text-uppercase" width="30%">
                          Product
                        </th>
                        <th
                          className="product-price text-uppercase"
                          width="15%"
                        >
                          Price
                        </th>
                        <th
                          className="product-quantity text-uppercase"
                          width="20%"
                        >
                          Quantity
                        </th>
                        <th
                          className="product-subtotal text-uppercase text-end"
                          width="20%"
                        >
                          Subtotal
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                     {cartData && cartData.map((cartItem, index) =>{
                      return (

                        <tr className="cart_table_item">
                        <td className="product-thumbnail">
                          <div className="product-thumbnail-wrapper">
                            <a
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation()
                                let { cartId, userId } = cartItem;
                                // //! delete item hanlder
                                // deleteCartItemHandler({ cartId, userId }, token)
                                // .then((res) => {
                                //   dispatch(addItemInCart(res.data));
                                // })
                                // .catch((error) => {
                                //   console.log("error", error);
                                // });
                                dispatch( deleteCartItem(cartItem.productId))
                              }}
      
                              className="product-thumbnail-remove"
                              title="Remove Product"
                            >
                              <i className="fas fa-times" />
                            </a>
                            <a
                              href="shop-product-sidebar-right.html"
                              className="product-thumbnail-image"
                              title={`${cartItem.productName}`}
                            >
                              <img
                                width={90}
                                height={90}
                                alt=""
                                className="img-fluid"
                                src={`${process.env.REACT_APP_BASE_URL}${cartItem.productImage}`}
                              />
                            </a>
                          </div>
                        </td>
                        <td className="product-name">
                          <a
                            href="shop-product-sidebar-right.html"
                            className="font-weight-semi-bold text-color-dark text-color-hover-primary text-decoration-none"
                          >
                           {cartItem.productName}
                          </a>
                        </td>
                        <td className="product-price">
                          <span className="amount font-weight-medium text-color-grey">
                          ₹{cartItem.productDiscountPrice}
                          </span>
                        </td>
                        <td className="product-quantity">
                          <div className="quantity float-none m-0">
                            <input
                              type="button"
                              className="minus text-color-hover-light bg-color-hover-primary border-color-hover-primary"
                              defaultValue="-"
                              
                              onClick={(e) => {
                                //! decrease cart quantity by one but if greater than 1
                                e.preventDefault();
                                e.stopPropagation();
                                // let { cartId, userId, productQuantity, productId } =
                                //   cartItem;
                                // if (productQuantity === 1) {
                                //   return;
                                // }
                                // productQuantity -= 1;
                                // updateCartItemHandler(
                                //   { cartId, productQuantity, userId, productId },
                                //   token
                                // )
                                //   .then((res) => {
                                   
                                //     dispatch(addItemInCart(res.data));
                                //     // console.log("result after increment ",res.data)
                                //   })
                                //   .catch((error) => {
                                //     console.log("error", error);
                                //   });

                                 dispatch(decrementItemQuantity(cartItem.productId))
                              }}
    
                            />
                            <input
                              type="text"
                              className="input-text qty text"
                              title="Qty"
                              value={cartItem.productQuantity}
                              name="quantity"
                              min={1}
                              step={1}
                            />
                            <input
                              type="button"
                              className="plus text-color-hover-light bg-color-hover-primary border-color-hover-primary"
                              defaultValue="+"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // //! update cart quantity by one
                                // let { cartId, userId, productQuantity, productId } =
                                //   cartItem;
                                // productQuantity += 1;
    
                                // updateCartItemHandler(
                                //   { cartId, userId, productQuantity, productId },
                                //   token
                                // )
                                //   .then((res) => {
                                  
                                //     dispatch(addItemInCart(res.data));
                                //     // console.log("result after increment ",res.data)
                                //   })
                                //   .catch((error) => {
                                //     const { data } = error.response;
                                //     Swal.fire(
                                //       "Product quantity limit exceeded!!",
                                //       data.message,
                                //       "error"
                                //     );
                                //     console.log("error", error);
                                //   });
                                dispatch(incrementItemQuantity(cartItem.productId))
                              }}
    
                            />
                          </div>
                        </td>
                        <td className="product-subtotal text-end">
                          <span className="amount text-color-dark font-weight-bold text-4">
                          ₹{(cartItem.productQuantity*cartItem.productDiscountPrice)}
                          </span>
                        </td>
                      </tr>
                      )
                     })}
                      
                      <tr>
                        <td colSpan={5}>
                          <div className="row justify-content-between mx-0">
                            <div className="col-md-auto px-0 mb-3 mb-md-0">
                              <div className="d-flex align-items-center">
                                <input
                                  type="text"
                                  className="form-control h-auto border-radius-0 line-height-1 py-3"
                                  name="couponCode"
                                  placeholder="Coupon Code"
                                />
                                <button
                                  type="submit"
                                  onClick={(e)=>{
                                    e.preventDefault()
                                  }}
                                  className="btn btn-light btn-modern text-color-dark bg-color-light-scale-2 text-color-hover-light bg-color-hover-primary text-uppercase text-3 font-weight-bold border-0 border-radius-0 ws-nowrap btn-px-4 py-3 ms-2"
                                >
                                  Apply Coupon
                                </button>
                              </div>
                            </div>
                            <div className="col-md-auto px-0">
                              {/* <button
                                type="submit"
                                className="btn btn-light btn-modern text-color-dark bg-color-light-scale-2 text-color-hover-light bg-color-hover-primary text-uppercase text-3 font-weight-bold border-0 border-radius-0 btn-px-4 py-3"
                              >
                                Update Cart
                              </button> */}
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
            <div className="col-lg-4 position-relative">
              <div
                className="card border-width-3 border-radius-0 border-color-hover-dark"
                data-plugin-sticky
                data-plugin-options="{'minWidth': 991, 'containerSelector': '.row', 'padding': {'top': 85}}"
              >
                <div className="card-body">
                  <h4 className="font-weight-bold text-uppercase text-4 mb-3">
                    Cart Totals
                  </h4>
                  <table className="shop_table cart-totals mb-4">
                    <tbody>
                      <tr className="cart-subtotal">
                        <td className="border-top-0">
                          <strong className="text-color-dark">Subtotal</strong>
                        </td>
                        <td className="border-top-0 text-end">
                          <strong>
                            <span className="amount font-weight-medium">
                            ₹{totalDiscountedPrice}
                            </span>
                          </strong>
                        </td>
                      </tr>
                      <tr className="shipping">
                        <td colSpan={2}>
                          <strong className="d-block text-color-dark mb-2">
                            Shipping
                          </strong>
                          <div className="d-flex flex-column">
                            <label
                              className="d-flex align-items-center text-color-grey mb-0"
                              htmlFor="shipping_method1"
                            >
                              <input
                                id="shipping_method1"
                                type="radio"
                                className="me-2"
                                name="shipping_method"
                                defaultValue="free"
                                defaultChecked
                              />
                              Free Shipping
                            </label>
                           
                          </div>
                        </td>
                      </tr>
                      <tr className="total">
                        <td>
                          <strong className="text-color-dark text-3-5">
                            Total
                          </strong>
                        </td>
                        <td className="text-end">
                          <strong className="text-color-dark">
                            <span className="amount text-color-dark text-5">
                            ₹{totalDiscountedPrice}
                            </span>
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <a
                    href="#"
                    onClick={(e)=>{
                      e.preventDefault();
                      e.stopPropagation();
                      navigate('/checkout')
                    }}
                    className="btn btn-dark btn-modern w-100 text-uppercase bg-color-hover-primary border-color-hover-primary border-radius-0 text-3 py-3"
                  >
                    Proceed to Checkout{" "}
                    <i className="fas fa-arrow-right ms-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>
         
        </div>
      </div>
      </>:<div className="container p-3" style={{marginTop:'12rem'}}>
            <p className="text-center display-1">Cart is empty !</p>
        </div>}
    </div>
  );
}
