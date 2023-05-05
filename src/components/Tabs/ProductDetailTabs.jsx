import { Rating } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function ProductDetailTabs() {
  const [tabOption, setTabOption] = useState({
    descriptionTab: true,
    additionalInfoTab: false,
    reviewTab: false,
  });
  const {singleProduct}= useSelector((store)=>store.getallproductReducer);
  const [rating, setRating] = useState(1);
 console.log('rating',rating)
  //console.log("tab states ", tabOption);
  return (
    <>
      <div className="row mb-4">
        <div className="col">
          <div
            id="description"
            className="tabs tabs-simple tabs-simple-full-width-line tabs-product tabs-dark mb-2"
          >
            <ul className="nav nav-tabs justify-content-start">
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    tabOption.descriptionTab ? "active" : ""
                  }  font-weight-bold text-3 text-uppercase py-2 px-3`}
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setTabOption({
                      descriptionTab: true,
                      additionalInfoTab: false,
                      reviewTab: false,
                    });
                  }}
                  data-bs-toggle="tab"
                >
                  Description
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    tabOption.additionalInfoTab ? "active" : ""
                  }  font-weight-bold text-3 text-uppercase py-2 px-3`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setTabOption({
                      descriptionTab: false,
                      additionalInfoTab: true,
                      reviewTab: false,
                    });
                  }}
                  data-bs-toggle="tab"
                >
                  Additional Information
                </a>
              </li>
              <li className="nav-item">
                <a
                  className={`nav-link ${
                    tabOption.reviewTab ? "active" : ""
                  }  font-weight-bold text-3 text-uppercase py-2 px-3`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setTabOption({
                      descriptionTab: false,
                      additionalInfoTab: false,
                      reviewTab: true,
                    });
                  }}
                  data-bs-toggle="tab"
                >
                  Reviews (2)
                </a>
              </li>
            </ul>
            <div className="tab-content p-0">
              {tabOption.descriptionTab && (
                <div className="tab-pane px-0 py-3 active">
                  <p>
                    {singleProduct.productDescription}
                  </p>
                  <p className="m-0">
                    Vestibulum ante ipsum primis in faucibus orci luctus et
                    ultrices posuere cubilia Curae; Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit. Fusce sagittis, massa fringilla
                    consequat blandit, mauris ligula porta nisi, non tristique
                    enim sapien vel nisl. Suspendisse vestibulum lobortis
                    dapibus. Vestibulum ante ipsum primis in faucibus orci
                    luctus et ultrices posuere cubilia Curae;
                  </p>
                </div>
              )}
              {tabOption.additionalInfoTab && (
                <div className=" px-0 py-3">
                  <table className="table table-striped m-0">
                    <tbody>
                      <tr>
                        <th className="border-top-0">Size:</th>
                        <td className="border-top-0">Unique</td>
                      </tr>
                      <tr>
                        <th>Colors</th>
                        <td>Red, Blue</td>
                      </tr>
                      <tr>
                        <th>Material</th>
                        <td>100% Leather</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {tabOption.reviewTab && ''
                // <div className=" px-0 py-3">
                //   <ul className="comments">
                //     <li>
                //       <div className="comment">
                //         <div className="img-thumbnail border-0 p-0 d-none d-md-block">
                //           <img
                //             className="avatar rounded-circle"
                //             alt
                //             src="https://www.okler.net/previews/porto/9.9.0/img/avatars/avatar-2.jpg"
                //           />
                //         </div>
                //         <div className="comment-block">
                //           <div className="comment-arrow" />
                //           <span className="comment-by">
                //             <strong>Jack Doe</strong>
                //             <span className="float-end">
                //               <div className="pb-0 clearfix">
                //                 <div
                //                   title="Rated 3 out of 5"
                //                   className="float-start"
                //                 >
                //                   <input
                //                     type="text"
                //                     className="d-none"
                //                     defaultValue={3}
                //                     title
                //                     data-plugin-star-rating
                //                     data-plugin-options="{'displayOnly': true, 'color': 'primary', 'size':'xs'}"
                //                   />
                //                 </div>
                //                 <div className="review-num">
                //                   <span
                //                     className="count"
                //                     itemProp="ratingCount"
                //                   >
                //                     2
                //                   </span>{" "}
                //                   reviews
                //                 </div>
                //               </div>
                //             </span>
                //           </span>
                //           <p>
                //             Lorem ipsum dolor sit amet, consectetur adipiscing
                //             elit. Nam viverra euismod odio, gravida pellentesque
                //             urna varius vitae, gravida pellentesque urna varius
                //             vitae.
                //           </p>
                //         </div>
                //       </div>
                //     </li>
                //     <li>
                //       <div className="comment">
                //         <div className="img-thumbnail border-0 p-0 d-none d-md-block">
                //           <img
                //             className="avatar rounded-circle"
                //             alt
                //             src="https://www.okler.net/previews/porto/9.9.0/img/avatars/avatar-2.jpg"
                //           />
                //         </div>
                //         <div className="comment-block">
                //           <div className="comment-arrow" />
                //           <span className="comment-by">
                //             <strong>John Doe</strong>
                //             <span className="float-end">
                //               <div className="pb-0 clearfix">
                //                 <div
                //                   title="Rated 3 out of 5"
                //                   className="float-start"
                //                 >
                //                   <input
                //                     type="text"
                //                     className="d-none"
                //                     defaultValue={3}
                //                     title
                //                     data-plugin-star-rating
                //                     data-plugin-options="{'displayOnly': true, 'color': 'primary', 'size':'xs'}"
                //                   />
                //                 </div>
                //                 <div className="review-num">
                //                   <span
                //                     className="count"
                //                     itemProp="ratingCount"
                //                   >
                //                     2
                //                   </span>{" "}
                //                   reviews
                //                 </div>
                //               </div>
                //             </span>
                //           </span>
                //           <p>
                //             Lorem ipsum dolor sit amet, consectetur adipiscing
                //             elit. Nam viverra odio, gravida urna varius vitae,
                //             gravida pellentesque urna varius vitae.
                //           </p>
                //         </div>
                //       </div>
                //     </li>
                //   </ul>
                //   <hr className="solid my-5" />
                //   <h4>Add a review</h4>
                //   <div className="row">
                //     <div className="col">
                //       <form >
                //         <div className="row">
                //           <div className="form-group col pb-2">
                //             <label className="form-label required font-weight-bold text-dark">
                //               Rating
                //             </label>{" "}
                //             <br />
                //             {/* <input
                //                  type="text"
                //                  className="rating-loading"
                //                  defaultValue={0}
                //                  title
                //                  data-plugin-star-rating
                //                  data-plugin-options="{'color': 'primary', 'size':'sm'}"
                //                /> */}
                //             <Rating
                //               onChange={(event, newValue) => {
                //                 event.preventDefault()
                //                  event.stopPropagation()
                //                 //  console.log('previous rating:', event.target.value)
                //                 setRating(event.target.value);
                //               }}
                //               name="half-rating"
                //               value={rating}
                //               precision={0.5}
                //             />
                //           </div>
                //         </div>
                //         <div className="row">
                //           <div className="form-group col-lg-6">
                //             <label className="form-label required font-weight-bold text-dark">
                //               Name
                //             </label>
                //             <input
                //               type="text"
                              
                //               data-msg-required="Please enter your name."
                //               maxLength={100}
                //               className="form-control"
                //               name="name"
                //               required
                //             />
                //           </div>
                //           <div className="form-group col-lg-6">
                //             <label className="form-label required font-weight-bold text-dark">
                //               Email Address
                //             </label>
                //             <input
                //               type="email"
                    
                //               data-msg-required="Please enter your email address."
                //               data-msg-email="Please enter a valid email address."
                //               maxLength={100}
                //               className="form-control"
                //               name="email"
                //               required
                //             />
                //           </div>
                //         </div>
                //         <div className="row">
                //           <div className="form-group col">
                //             <label className="form-label required font-weight-bold text-dark">
                //               Review
                //             </label>
                //             <textarea
                //               maxLength={5000}
                //               data-msg-required="Please enter your review."
                //               rows={8}
                //               className="form-control"
                //               name="review"
                //               id="review"
                //               required
                //               defaultValue={""}
                //             />
                //           </div>
                //         </div>
                //         <div className="row">
                //           <div className="form-group col mb-0">
                //             <input
                //               type="submit"
                //               defaultValue="Post Review"
                //               className="btn btn-primary btn-modern"
                //               data-loading-text="Loading..."
                //             />
                //           </div>
                //         </div>
                //       </form>
                //     </div>
                //   </div>
                // </div>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
