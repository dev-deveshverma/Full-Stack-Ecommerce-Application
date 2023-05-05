import { Button, Modal } from 'react-bootstrap'
import React from 'react'
import SwiperSlider from '../../Slider/SwiperSlider'
import { useDispatch, useSelector } from 'react-redux';
import { addToCartHelper } from '../../commonHelpers/addToCart.helper';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { addToCartByReduxHelper } from '../../commonHelpers/addToByRedux';
import { addFavouriteItem } from '../../Redux/features/cartSlice';
import { isItemPresentInCart, isItemPresentInFavoruiteList } from '../../commonHelpers/checkItemPresent';

export default function ProductQuickView({show,handleClose}) {
  const {singleProduct}= useSelector((store)=>store.getallproductReducer);
  const {cartData,favouriteList}= useSelector(store=>store.cartReducer);
  const {token,user}=useSelector((store)=>store.loginReducer)
  const navigate=useNavigate()
  const dispatch=useDispatch();

  //! list of products image which will be displayed in slider 
  return (
    <>

    <Modal  show={show} onHide={handleClose} className=' modal modal-sm modal-lg ' >
      <Modal.Header closeButton></Modal.Header>
        <Modal.Body >

        <div role={'dialog'} className="shop" style={{"-webkit-animation-duration":"300ms","animation-duration":"300ms"}}>
     <div className="row">
    <div className="col-lg-6">
     <SwiperSlider/>
    </div>
    <div className="col-lg-6">
      <div className="summary entry-summary position-relative">
        <h1 className="font-weight-bold text-7 mb-0"><a href={`/${slugify(singleProduct.Subcategory?.sub_categoryName || "")}/${slugify(singleProduct.productName || "")}/${singleProduct.productId}`} onClick={(e)=>{
          e.preventDefault();
          e.stopPropagation();
          navigate(`/${slugify(singleProduct.Subcategory?.sub_categoryName)}/${slugify(singleProduct.productName)}/${singleProduct.productId}`)
        }} className="text-decoration-none text-color-dark text-color-hover-primary">{singleProduct.productName}</a></h1>
        <div className="pb-0 clearfix d-flex align-items-center">
          <div title="Rated 3 out of 5" className="float-start">
            <input type="text" className="d-none"  />
          </div>
          <div className="review-num">
            <span className="count" itemProp="ratingCount">(2</span> reviews)
          </div>
        </div>
        <div className="divider divider-small">
          <hr className="bg-color-grey-scale-4" />
        </div>
        <p className="price mb-3">
          <span className="sale text-color-dark">₹ {singleProduct.productDiscontPrice}</span>
          <span className="amount"> ₹{singleProduct.productPrice}</span>
        </p>
        <p className="text-3-5 mb-3">{singleProduct.productDescription}</p>
        <ul className="list list-unstyled text-2">
          <li className="mb-0">AVAILABILITY: <strong className="text-color-dark">AVAILABLE</strong></li>
          <li className="mb-0">SKU: <strong className="text-color-dark">1234567890</strong></li>
        </ul>
        <form encType="multipart/form-data" method="post" className="cart">
          <table className="table table-borderless" style={{"max-width":"300px"}}>
            <tbody>
              <tr>
                <td className="align-middle text-2 px-0 py-2">SIZE:</td>
                <td className="px-0 py-2">
                  <div className="custom-select-1">
                    <select name="size" className="form-control form-select text-1 h-auto py-2">
                      <option value>PLEASE CHOOSE</option>
                      <option value="blue">Small</option>
                      <option value="red">Normal</option>
                      <option value="green">Big</option>
                    </select>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="align-middle text-2 px-0 py-2">COLOR:</td>
                <td className="px-0 py-2">
                  <div className="custom-select-1">
                    <select name="color" className="form-control form-select text-1 h-auto py-2">
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
            {/* <input type="button" className="minus text-color-hover-light bg-color-hover-primary border-color-hover-primary" defaultValue="-" />
            <input type="text" className="input-text qty text" title="Qty" defaultValue={1} name="quantity" min={1} step={1} />
            <input type="button" className="plus text-color-hover-light bg-color-hover-primary border-color-hover-primary" defaultValue="+" /> */}
          </div>
          {
                                  isItemPresentInCart(singleProduct.productId,cartData).length?  <button
                                  type="submit"
                                  className="btn btn-dark btn-modern text-uppercase bg-color-hover-primary border-color-hover-primary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    navigate('/cart')
                                    handleClose()
                                  }}
                                >
                                  View in Cart
                                </button>:  <button
                                    type="submit"
                                    className="btn btn-dark btn-modern text-uppercase bg-color-hover-primary border-color-hover-primary"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      addToCartByReduxHelper(singleProduct, dispatch);
                                      handleClose()
                                    }}
                                  >
                                    Add to cart
                                  </button>
                                }
          <hr />
        </form>
        <div className="d-flex align-items-center">
          <ul className="social-icons social-icons-medium social-icons-clean-with-border social-icons-clean-with-border-border-grey social-icons-clean-with-border-icon-dark me-3 mb-0">
            {/* Facebook */}
            <li className="social-icons-facebook">
              <a href="" onClick={(e)=>e.preventDefault()} target="_blank" data-bs-toggle="tooltip" data-bs-animation="false" data-bs-placement="top" title="Share On Facebook">
                <i className="fab fa-facebook-f" />
              </a>
            </li>
            {/* Google+ */}
            <li className="social-icons-googleplus">
              <a href="" onClick={(e)=>e.preventDefault()} target="_blank" data-bs-toggle="tooltip" data-bs-animation="false" data-bs-placement="top" title="Share On Google+">
                <i className="fab fa-google-plus-g" />
              </a>
            </li>
            {/* Twitter */}
            <li className="social-icons-twitter">
              <a href="" onClick={(e)=>e.preventDefault()} target="_blank" data-bs-toggle="tooltip" data-bs-animation="false" data-bs-placement="top" title="Share On Twitter">
                <i className="fab fa-twitter" />
              </a>
            </li>
            {/* Email */}
            <li className="social-icons-email">
              <a href="" onClick={(e)=>e.preventDefault()} data-bs-toggle="tooltip" data-bs-animation="false" data-bs-placement="top" title="Share By Email">
                <i className="far fa-envelope" />
              </a>
            </li>
          </ul>
            {
              isItemPresentInFavoruiteList(singleProduct.productId,favouriteList).length?
              <a 
              onClick={(e) =>{
               e.preventDefault()
               e.stopPropagation();
                navigate('/user/fevorate')
                handleClose()
              }}
             href ='' className="d-flex align-items-center text-decoration-none text-color-dark text-color-hover-primary font-weight-semibold text-2">
               <i className="far fa-heart me-1 text-color-danger" /> See Wishlist
             </a>
              :   <a 
              onClick={(e) =>{
               e.preventDefault()
               e.stopPropagation();
                dispatch(addFavouriteItem(singleProduct))
                handleClose()
              }}
             href={`/${slugify(singleProduct.Subcategory?.sub_categoryName || "")}/${slugify(singleProduct.productName ||"")}/${singleProduct.productId}`} className="d-flex align-items-center text-decoration-none text-color-dark text-color-hover-primary font-weight-semibold text-2">
               <i className="far fa-heart me-1" /> SAVE TO WISHLIST
             </a>
            }
        </div>
      </div>
    </div>
  </div>
   </div>
        </Modal.Body>
      </Modal>
  
    
    </>
  )
}
