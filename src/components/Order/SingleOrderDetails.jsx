import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getsingleOrder } from '../../service/api';
import moment from 'moment';

export default function SingleOrderDetails() {

  const [order, setOrder] = useState();
  const { orderId } = useParams();

  console.log("getsingleorderdata", orderId)

  const getSingleOrderdata = async () => {
    try {
      const res = await getsingleOrder(orderId);
      setOrder(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  
  useEffect(() => {
   
    getSingleOrderdata()
  }, [orderId])


  console.log("order", order)

  return (
    <>

      <div role="main" className="main shop pb-4 mt-3" >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8"  style={{ marginTop: "12rem" }}>
              <div className="card border-width-3 border-radius-0 ">
                <div className="card-body text-center">
                  <p className="text-color-dark font-weight-bold text-4-5 mb-0">
                    {/* <i className="fas fa-check text-color-success me-1" />{" "} */}
                    See your order detail here
                  </p>
                </div>
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-between py-3 px-4 my-4">
                <div className="text-center">
                  <span>
                    Order Number <br />
                    <strong className="text-color-dark">{order?.orderId}</strong>
                  </span>
                </div>
                <div className="text-center mt-4 mt-md-0">
                  <span>
                    Date <br />
                    <strong className="text-color-dark">
                      <span class="month">{moment(order?.orderDate).format('MMM')}</span>
                      {" "}
                      <span class="day">{moment(order?.orderDate).format('D')}</span>, {" "}
                      <span class="day">{moment(order?.orderDate).format('Y')}</span>
                    </strong>
                  </span>
                </div>
                <div className="text-center mt-4 mt-md-0">
                  <span>
                    Email <br />
                    <strong className="text-color-dark">{order?.shippingAddress?.email}</strong>
                  </span>
                </div>
                <div className="text-center mt-4 mt-md-0">
                  <span>
                    Total <br />
                    <strong className="text-color-dark">₹ {order?.orderAmount}</strong>
                  </span>
                </div>
                <div className="text-center mt-4 mt-md-0">
                  <span>
                    Payment Method <br />
                    <strong className="text-color-dark">
                      Card
                    </strong>
                  </span>
                </div>
              </div>
              <div className="card border-width-3 border-radius-0 border-color-hover-dark mb-4">
                <div className="card-body">
                  <h4 className="font-weight-bold text-uppercase text-4 mb-3">
                    Your Order
                  </h4>
                  <table className="shop_table cart-totals mb-0">
                    <tbody>
                      <tr>
                        <td colSpan={2} className="border-top-0">
                          <strong className="text-color-dark">Product</strong>
                        </td>
                      </tr>
                      {

                        order?.orderedItems?.map((el) =>
                          <tr>
                            <td>
                              <strong className="d-block text-color-dark line-height-1 font-weight-semibold">
                                {el.productName}{" "}
                                <span className="product-qty">x1</span>
                              </strong>
                              <span className="text-1">COLOR BLACK</span>
                            </td>
                            <td className="text-end align-top">
                              <span className="amount font-weight-medium text-color-grey">
                                ₹ {el.productDiscountPrice}
                              </span>
                            </td>
                          </tr>
                        )
                      }


                      <tr className="cart-subtotal">
                        <td className="border-top-0">
                          <strong className="text-color-dark">
                            Subtotal
                          </strong>
                        </td>
                        <td className="border-top-0 text-end">
                          <strong>
                            <span className="amount font-weight-medium">
                              ₹ {order?.orderAmount}
                            </span>
                          </strong>
                        </td>
                      </tr>
                      <tr className="shipping">
                        <td className="border-top-0">
                          <strong className="text-color-dark">
                            Shipping
                          </strong>
                        </td>
                        <td className="border-top-0 text-end">
                          <strong>
                            <span className="amount font-weight-medium">
                              Free Shipping
                            </span>
                          </strong>
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
                              ₹ {order?.orderAmount}
                            </span>
                          </strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="row pt-3">
                <div className="col-lg-6 mb-4 mb-lg-0">
                  <h2 className="text-color-dark font-weight-bold text-5-5 mb-1">
                    Billing Address
                  </h2>
                  <ul className="list list-unstyled text-2 mb-0">
                    <li className="mb-0">{order?.shippingAddress?.firstName} <span> {order?.shippingAddress?.lastName}</span> </li>
                    <li className="mb-0">{order?.shippingAddress?.address}</li>
                    <li className="mb-0"> <span>{order?.shippingAddress?.city}</span>{order?.shippingAddress?.state} <span>{order?.shippingAddress?.pincode}</span></li>
                    <li className="mb-0">{order?.shippingAddress?.phone}</li>
                    <li className="mt-3 mb-0">{order?.shippingAddress?.email}</li>
                  </ul>
                </div>
                <div className="col-lg-6">
                  <h2 className="text-color-dark font-weight-bold text-5-5 mb-1">
                    Shipping Address
                  </h2>
                  <ul className="list list-unstyled text-2 mb-0">
                    <li className="mb-0">{order?.shippingAddress?.firstName} <span> {order?.shippingAddress?.lastName}</span> </li>
                    <li className="mb-0">{order?.shippingAddress?.address}</li>
                    <li className="mb-0"> <span>{order?.shippingAddress?.city}</span>{order?.shippingAddress?.state} <span>{order?.shippingAddress?.pincode}</span></li>
                    <li className="mb-0">{order?.shippingAddress?.phone}</li>
                    <li className="mt-3 mb-0">{order?.shippingAddress?.email}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}
