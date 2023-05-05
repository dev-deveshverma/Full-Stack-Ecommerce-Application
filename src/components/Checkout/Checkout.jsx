import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createOrder } from "../../service/api";
import { EMAIL_PATTERN, PHONE_PATTERN, STRING_PATTERN } from "../Auth/Register";
import CheckoutLogin from "./CheckoutLogin";
const ZIP_PATTERN = /^\d{6}$/;
 export const ADDRESS_PATTERN=/^[a-zA-Z]/
export default function Checkout() {
  //! cart store
  const { cartData, totalDiscountedPrice } = useSelector(
    (store) => store.cartReducer
  );
  const {token, user}= useSelector(store=>store.loginReducer)
  //! billing state 
  const [billingAddress, setBillingAddress] = useState({
    firstName: "",
    lastName: "",
    email: user.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    orderNotes: "",
  });
   //! validation error state 
 const [errorMessage,setErrorMessage]=useState({
  firstNameErr:'',
  lastNameErr:'',
   addressErr:'',
 })
//! login api error state 
const [apiResponseMsg,setapiResponseMsg] = useState(null)
//! handler for input
  const billingAddressHanlder = async (e) => {
    const { name, value } = e.target;
    //** reseting error state */
    setErrorMessage({
      firstNameErr:"",
      lastNameErr:"",
      addressErr:''
    })
    setBillingAddress({ ...billingAddress, [name]: value });
  };
  //! placeholder  handler 
  const placeOrderHandler = async (e) => {
    e.preventDefault();
     //! validation checkpoint 
     if(billingAddress.firstName==="" || billingAddress.lastName==="" || billingAddress.address===""){
      setErrorMessage({
        firstNameErr:"First name is required",
        lastNameErr:'Last name is required',
        addressErr:'Address is required'
      })
      return false
     }
     if(!STRING_PATTERN.test(billingAddress.firstName)){
      setErrorMessage({firstNameErr:"First name must contains only letters",lastNameErr:'',addressErr:''})
      return 
     }
     if(!STRING_PATTERN.test(billingAddress.lastName)){
      setErrorMessage({firstNameErr:"",lastNameErr:'Last name must contains only letters',addressErr:''})
     }
    //  if(!STRING_PATTERN.test(billingAddress.state) || !STRING_PATTERN.test(billingAddress.city)){
    //   toast.error("State or City name must be a valid characters.",{position:'top-center'});
    //   return 
    //  }
    //  if(!PHONE_PATTERN.test(billingAddress.phone) || !ZIP_PATTERN.test(billingAddress.pincode)){
    //   toast.error("Phone number or Zip/Pincode must be a valid number.",{position:'top-center'});
    //   return 
    //  }
    //  if(!EMAIL_PATTERN.test(billingAddress.email)){
    //   toast.error("Email is invalid.",{position:'top-center'});
    //   return 
    //  }
     if(!ADDRESS_PATTERN.test(billingAddress.address)){
      setErrorMessage({firstNameErr:"",lastNameErr:'',addressErr:'Please enter a valid address'})
      return 
     }
     //**** creating order  */
     try {
      //! first will create or update the order 
      const newOrder = await createOrder({userId:user.user_Id,shippingAddress:billingAddress,cartData});
       if(newOrder){
         //! initiate payment process next 
        const {data}= await   axios.post(`${process.env.REACT_APP_API_URL}/orderPayment/create-checkout-session`, {cart:cartData});
        window.location.href= data.url
        console.log('payment session created',data)
       }
      
     } catch (error) {
      console.log('error creating order',error)
     }
     

  };
 
  return (
    <div>
      
      <div role="main" className="main shop pb-4" style={{marginTop:'12rem'}}>
     
        
        <div className="container p-3">
       {token ==="" &&    <CheckoutLogin/>}


          {/* //!! billing address form */}
          <form
            role="form"
            className="needs-validation"
            onSubmit={placeOrderHandler}
          >
            <div className="row">
              <div className="col-lg-7 mb-4 mb-lg-0">
                <h2 className="text-color-dark font-weight-bold text-5-5 mb-3">
                  Billing Details
                </h2>
                <div className="row">
                  <div className="form-group col-md-6">
                    {
                      errorMessage.firstNameErr?<label className="form-label text-color-danger">
                      {errorMessage.firstNameErr} <span className="text-color-danger">*</span>
                    </label>:<label className="form-label">
                      First Name <span className="text-color-danger">*</span>
                    </label>
                    }
                    <input
                      type="text"
                      className={`form-control h-auto py-2 ${errorMessage.firstNameErr?"border-danger":''}`}
                      name="firstName"
                      onChange={billingAddressHanlder}
                      value={billingAddress.firstName}
                      placeholder="i.e jhon"
                      
                    />
                  </div>
                  <div className="form-group col-md-6">
                   {
                    errorMessage.lastNameErr? <label className="form-label text-color-danger">
                    {errorMessage.lastNameErr} <span className="text-color-danger">*</span>
                  </label>: <label className="form-label">
                      Last Name <span className="text-color-danger">*</span>
                    </label>
                   }
                    <input
                      type="text"
                      className={`form-control h-auto py-2 ${errorMessage.lastNameErr?"border-danger":''}`}
                      name="lastName"
                      onChange={billingAddressHanlder}
                      value={billingAddress.lastName}
                      placeholder="i.e smith"
                      
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="form-group col">
                    {
                      errorMessage.addressErr?<label className="form-label text-color-danger">
                      {errorMessage.addressErr}
                      <span className="text-color-danger">*</span>
                    </label>:<label className="form-label">
                      Street Address{" "}
                      <span className="text-color-danger">*</span>
                    </label>
                    }
                    <input
                      type="text"
                      className={`form-control h-auto py-2 ${errorMessage.addressErr?"border-danger":''}`}
                      name="address"
                      value={billingAddress.address}
                      onChange={billingAddressHanlder}
                      placeholder="House number and street name"
                      
                    />
                  </div>
                </div>

                {/* <div className="row">
                  <div className="form-group col">
                    <label className="form-label">
                      Town/City <span className="text-color-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control h-auto py-2"
                      placeholder="i.e Banaras , Banglore ..."
                      name="city"
                      value={billingAddress.city}
                      onChange={billingAddressHanlder}
                      
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col">
                    <label className="form-label">
                      State <span className="text-color-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control h-auto py-2"
                      placeholder="i.e Uttar Pradesh , Gujrat..."
                      name="state"
                      value={billingAddress.state}
                      onChange={billingAddressHanlder}
                      
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col">
                    <label className="form-label">
                      ZIP/PINCODE <span className="text-color-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control h-auto py-2"
                      name="pincode"
                      value={billingAddress.pincode}
                      onChange={billingAddressHanlder}
                      placeholder="i.e 212307"
                      
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col">
                    <label className="form-label">
                      Phone <span className="text-color-danger">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control h-auto py-2"
                      name="phone"
                      placeholder="i.e 1212121212"
                      value={billingAddress.phone}
                      onChange={billingAddressHanlder}
                      
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col">
                    <label className="form-label">
                      Email Address <span className="text-color-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className="form-control h-auto py-2"
                      name="email"
                      onChange={billingAddressHanlder}
                      value={billingAddress.email}
                      placeholder="i.e jhon@example.com"
                      
                    />
                  </div>
                </div> */}

                <div className="shipping-field-wrapper collapse">
                  <div className="row">
                    <div className="form-group col-md-6">
                      <label className="form-label">
                        First Name <span className="text-color-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control h-auto py-2"
                        name="shippingFirstName"
                        
                      />
                    </div>
                    <div className="form-group col-md-6">
                      <label className="form-label">
                        Last Name <span className="text-color-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control h-auto py-2"
                        name="shippingLastName"
                        
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <label className="form-label">Company Name</label>
                      <input
                        type="text"
                        className="form-control h-auto py-2"
                        name="shippingCompanyName"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <label className="form-label">
                        Country/Region{" "}
                        <span className="text-color-danger">*</span>
                      </label>
                      <div className="custom-select-1">
                        <select
                          className="form-select form-control h-auto py-2"
                          name="shippingCountry"
                          
                        >
                          <option value selected />
                          <option value="usa">United States</option>
                          <option value="spa">Spain</option>
                          <option value="fra">France</option>
                          <option value="uk">United Kingdon</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <label className="form-label">
                        Street Address{" "}
                        <span className="text-color-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control h-auto py-2"
                        name="shippingAddress1"
                        placeholder="House number and street name"
                        
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <input
                        type="text"
                        className="form-control h-auto py-2"
                        name="shippingAddress2"
                        placeholder="Apartment, suite, unit, etc..."
                        
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <label className="form-label">
                        Town/City <span className="text-color-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control h-auto py-2"
                        name="shippingCity"
                        
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <label className="form-label">
                        State <span className="text-color-danger">*</span>
                      </label>
                      <div className="custom-select-1">
                        <select
                          className="form-select form-control h-auto py-2"
                          name="shippingState"
                          
                        >
                          <option value selected />
                          <option value="ny">Nova York</option>
                          <option value="ca">California</option>
                          <option value="tx">Texas</option>
                          <option value>Florida</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <label className="form-label">
                        ZIP <span className="text-color-danger">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control h-auto py-2"
                        name="shippingZip"
                        
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <label className="form-label">
                        Phone <span className="text-color-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control h-auto py-2"
                        name="shippingPhone"
                        
                      />
                    </div>
                  </div>
                  {/* End of Ship to a differente address fields */}
                </div>
                {/* <div className="row">
                  <div className="form-group col">
                    <label className="form-label">Order Notes</label>
                    <textarea
                      className="form-control h-auto py-2"
                      name="orderNotes"
                      value={billingAddress.orderNotes}
                      onChange={billingAddressHanlder}
                      rows={5}
                      placeholder="Notes about you orderm e.g. special notes for delivery"
                    />
                  </div>
                </div> */}
              </div>
              <div className="col-lg-5 position-relative">
                <div
                  className="card border-width-3 border-radius-0 border-color-hover-dark"
                  data-plugin-sticky
                  data-plugin-options="{'minWidth': 991, 'containerSelector': '.row', 'padding': {'top': 85}}"
                >
                  <div className="card-body">
                    <h4 className="font-weight-bold text-uppercase text-4 mb-3">
                      Your Order
                    </h4>
                    <table className="shop_table cart-totals mb-3">
                      <tbody>
                        <tr>
                          <td colSpan={2} className="border-top-0">
                            <strong className="text-color-dark">Product</strong>
                          </td>
                        </tr>
                        {cartData &&
                          cartData.map((cartItem) => {
                            return (
                              <tr>
                                <td>
                                  <strong className="d-block text-color-dark line-height-1 font-weight-semibold">
                                    {cartItem.productName}
                                    {/* <span className="product-qty">Qty.{cartItem.productQuantity}</span> */}
                                  </strong>
                                  <span className=" product-qty">
                                    {" "}
                                    Qty.{cartItem.productQuantity}
                                  </span>
                                </td>
                                <td className="text-end align-top">
                                  <span className="amount font-weight-medium text-color-grey">
                                    ₹{cartItem.productQuantity*cartItem.productDiscountPrice}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}

                        <tr className="cart-subtotal">
                          <td className="border-top-0">
                            <strong className="text-color-dark">
                              Subtotal
                            </strong>
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
                        {/* <tr className="payment-methods">
                          <td colSpan={2}>
                            <strong className="d-block text-color-dark mb-2">
                              Payment Methods
                            </strong>
                            <div className="d-flex flex-column">
                              <label
                                className="d-flex align-items-center text-color-grey mb-0"
                                htmlFor="payment_method1"
                              >
                                <input
                                  id="payment_method1"
                                  type="radio"
                                  className="me-2"
                                  name="payment_method"
                                  defaultValue="cash-on-delivery"
                                  defaultChecked
                                />
                                Cash On Delivery
                              </label>
                              <label
                                className="d-flex align-items-center text-color-grey mb-0"
                                htmlFor="payment_method2"
                              >
                                <input
                                  id="payment_method2"
                                  type="radio"
                                  className="me-2"
                                  name="payment_method"
                                  defaultValue="paypal"
                                />
                                PayPal
                              </label>
                            </div>
                          </td>
                        </tr> */}
                        <tr>
                          <td colSpan={2}>
                            Your personal data will be used to process your
                            order, support your experience throughout this
                            website, and for other purposes described in our
                            privacy policy.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {
                      token ===""?<button
                      type="submit"
                       disabled
                     
                      className="btn btn-dark btn-modern w-100 text-uppercase bg-color-hover-primary border-color-hover-primary border-radius-0 text-3 py-3"
                    >
                      Login to proceed
                    </button>:
                      <button
                      type="submit"
                      onClick={placeOrderHandler}
                     
                      className="btn btn-dark btn-modern w-100 text-uppercase bg-color-hover-primary border-color-hover-primary border-radius-0 text-3 py-3"
                    >
                      Place Order <i className="fas fa-arrow-right ms-2" />
                    </button>
                    }
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
