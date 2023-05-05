import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAllProductData,
  setPageCount,
  updateProduct,
} from "../../Redux/features/getallproductSlice";
import SingleProductCard from "../product/SingleProductCard";

import "react-toastify/dist/ReactToastify.css";
import {
  getallCategory,
  getallProduct,
  getallProducts,
} from "../../service/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { addSearchResult } from "../../Redux/features/searchSlice";
import slugify from "slugify";
import { categoryProductHelper } from "../navbar/Navbar";

export default function Home() {
  const disptach = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  //** Main category state */
  const [mainCategory, setMainCategory] = useState([]);
  //*** Selected main category from side filter option */
  const [selectedMainCategory, setSelectedMainCategory] = useState("All");
  const [allcategories, Setallcategories] = useState();
  const [page, setPage] = useState(1);
  const [clickedCategoryId, setClickedCategoryId] = useState(null);
  const [searchTexts, setSearchTexts] = React.useState("");
  const [pagination, setpagination] = useState({
    currentPage: 1,
    clickedButtonIndex: 0,
  });
  const serachResults = useSelector((store) => store.serachReducer);

  const { product } = useSelector((store) => store.getallproductReducer);
  //  console.log("all product ka data",product);

  const getallproductReducer = async () => {
    try {
      const getcategories = await getallProduct();
      Setallcategories(getcategories.data);
    } catch (error) {
      console.log(error);
    }
  };
  //! get all pages for pagination
  const getAllPages = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/products/pages?limit=6`)
      .then((res) => {
        disptach(setPageCount(res.data?.totalPages)); //! updating page count value
        setPage(res.data?.totalPages);
      })
      .catch((err) => {
        console.log("error while page fetching", err);
      });
  };
  //! get all parent category handler
  const getAllParentCategoryHandler = () => {
    getallCategory()
      .then((category) => {
        setMainCategory(category.data);
      })
      .catch((err) => {
        console.log("error while fetching category", err);
      });
  };
  useEffect(() => {
    disptach(fetchAllProductData(pagination.currentPage));
    getallproductReducer();
    getAllPages();
    getAllParentCategoryHandler();
  }, []);

  //!pagination effect
  useEffect(() => {
    disptach(fetchAllProductData(pagination.currentPage));
  }, [pagination.currentPage]);

  useEffect(() => {
    getallProducts(clickedCategoryId)
      .then((res) => {
        console.log("res.data", res.data[0].Products);
        disptach(updateProduct(res.data[0]?.Products));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clickedCategoryId]);

  //! effect to fetch all products of selected category
  useEffect(() => {
    if (selectedMainCategory !== "All") {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/subCategory/category/${selectedMainCategory}`
        )
        .then((res) => {
          console.log("selected category result ", res.data);
          const contvertedProductlist = categoryProductHelper(res.data);
          disptach(updateProduct(contvertedProductlist));
        })
        .catch((err) => {
          console.log("error while fetching category req", err);
        });
      return;
    }
    //*** reseting category to all  */
    axios
      .get(`${process.env.REACT_APP_API_URL}/products?limit=6`)
      .then((res) => {
        console.log("all category result  ", res.data);

        disptach(updateProduct(res.data));
      })
      .catch((err) => {
        console.log("error while fetching category req", err);
      });
  }, [selectedMainCategory]);
  // console.log("allcategories", allcategories);
  return (
    <>
      <div
        role="main"
        className="main shop pt-4 "
        style={{ marginTop: "12rem" }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-3 order-1 order-lg-1">
              <aside className="sidebar">
                <form action="page-search-results.html" method="get">
                  <div className="input-group mb-3 pb-1">
                    <input
                      className="form-control text-1"
                      placeholder="Search..."
                      name="s"
                      id="s"
                      type="text"
                      onChange={(e) => {
                        setSearchTexts(e.target.value);
                      }}
                    />
                    <button
                      type="submit"
                      onClick={(event) => {
                        event.preventDefault();
                        if (searchTexts === "") {
                          return;
                        }
                        axios
                          .get(
                            `${process.env.REACT_APP_API_URL}/products?search=${searchTexts}`
                          )
                          .then((res) => {
                            disptach(addSearchResult(res.data));
                            console.log("search result", res);
                            setTimeout(() => {
                              // setSearchTexts('')
                              navigate("/searched");
                            }, 1000);
                          })
                          .catch((err) => {
                            console.log("error", err);
                          });
                      }}
                      className="btn btn-dark text-1 p-2"
                    >
                      <i className="fas fa-search m-2" />
                    </button>
                  </div>
                </form>
                <h5 className="font-weight-semi-bold pt-3">Categories</h5>
                <ul className="nav nav-list flex-column">
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="/"
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedMainCategory("All");
                      }}
                    >
                      All Categories
                    </a>
                  </li>
                  {mainCategory &&
                    mainCategory?.map((el) => (
                      <li className="nav-item" key={el.category_Id}>
                        <a
                          className="nav-link"
                          onClick={(e) => {
                            e.preventDefault();
                            setSelectedMainCategory(el.category_Id);
                          }}
                          href="#"
                        >
                          {el.categoryName}
                        </a>
                      </li>
                    ))}
                </ul>
                {/* <h5 className="font-weight-semi-bold pt-5">Tags</h5> */}
                {/* <div className="mb-3 pb-1">
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      Nike
                    </span>
                  </a>
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      Travel
                    </span>
                  </a>
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      Sport
                    </span>
                  </a>
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      TV
                    </span>
                  </a>
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      Books
                    </span>
                  </a>
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      Tech
                    </span>
                  </a>
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      Adidas
                    </span>
                  </a>
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      Promo
                    </span>
                  </a>
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      Reading
                    </span>
                  </a>
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      Social
                    </span>
                  </a>
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      Books
                    </span>
                  </a>
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      Tech
                    </span>
                  </a>
                  <a href="#">
                    <span className="badge badge-dark badge-sm rounded-pill text-uppercase px-2 py-1 me-1">
                      New
                    </span>
                  </a>
                </div> */}
                <div className="row mb-5">
                  <div className="col">
                    <h5 className="font-weight-semi-bold pt-5">
                      Top Rated Products
                    </h5>
                    {product &&
                      product.slice(0, 3).map((productItem) => {
                        return (
                          <>
                            <div
                              className="product row row-gutter-sm align-items-center mb-4"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // setClickedProductId(product.productId)
                                navigate(
                                  `/${slugify(
                                    productItem.Subcategory?.sub_categoryName
                                  )}/${slugify(productItem.productName)}/${
                                    productItem.productId
                                  }`
                                );
                              }}
                            >
                              <div className="col-5 col-lg-5">
                                <div className="product-thumb-info border-0">
                                  <a
                                    href={`/${slugify(
                                      productItem.Subcategory
                                        ?.sub_categoryName || ""
                                    )}/${slugify(
                                      productItem.productName || ""
                                    )}/${productItem.productId}`}
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    <div className="product-thumb-info-image">
                                      <img
                                        alt
                                        className="img-fluid"
                                        src={`${process.env.REACT_APP_BASE_URL}/${productItem?.productImages[0]?.filename}`}
                                      />
                                    </div>
                                  </a>
                                </div>
                              </div>
                              <div className="col-7 col-lg-7 ms-md-0 ms-lg-0 ps-lg-1 pt-1">
                                <a
                                  href="#"
                                  className="d-block text-uppercase text-decoration-none text-color-default text-color-hover-primary line-height-1 text-0 mb-2"
                                >
                                  {productItem.Subcategory?.sub_categoryName}
                                </a>
                                <h3 className="text-3-5 font-weight-medium font-alternative text-transform-none line-height-3 mb-0">
                                  <a
                                    href={`/${slugify(
                                      productItem.Subcategory
                                        ?.sub_categoryName || ""
                                    )}/${slugify(
                                      productItem.productName || ""
                                    )}/${productItem.productId}`}
                                    className="text-color-dark text-color-hover-primary text-decoration-none"
                                  >
                                    {productItem.productName}
                                  </a>
                                </h3>
                                <div title="Rated 5 out of 5">
                                  <input
                                    type="text"
                                    className="d-none"
                                    defaultValue={5}
                                    title
                                    data-plugin-star-rating
                                    data-plugin-options="{'displayOnly': true, 'color': 'dark', 'size':'xs'}"
                                  />
                                </div>
                                <p className="price text-4 mb-0">
                                  <span className="sale text-color-dark font-weight-semi-bold">
                                    ₹{productItem.productDiscontPrice}
                                  </span>
                                  <span className="amount">
                                    {" "}
                                    ₹{productItem.productPrice}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </>
                        );
                      })}
                  </div>
                </div>
              </aside>
            </div>
            <div className="col-lg-9 order-1 order-lg-2">
              <div className="">
                <div
                  className="row products product-thumb-info-list"
                  data-plugin-masonry
                  data-plugin-options="{'layoutMode': 'fitRows'}"
                >
                  {product?.map((product) => {
                    return <SingleProductCard product={product} />;
                  })}
                </div>
                {/* //! paginaton section  */}
                <div className="row mt-4">
                  <div className="col">
                    <ul className="pagination float-end">
                      <li className="page-item">
                        <a
                          className="page-link"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            let { currentPage, clickedButtonIndex } =
                              pagination;
                            if (currentPage === 1) {
                              return;
                            }
                            currentPage--;
                            clickedButtonIndex--;
                            setpagination({
                              currentPage,
                              clickedButtonIndex,
                            });
                          }}
                        >
                          <i className="fas fa-angle-left" />
                        </a>
                      </li>
                      {/* //? mapping all pages  */}
                      {Array.from(Array(page).keys()).map((page, index) => {
                        return (
                          <>
                            <li
                              className={`page-item ${
                                pagination.clickedButtonIndex === index
                                  ? "active"
                                  : ""
                              }`}
                            >
                              <a
                                className="page-link"
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setpagination({
                                    currentPage: page + 1,
                                    clickedButtonIndex: index,
                                  });
                                }}
                              >
                                {page + 1}
                              </a>
                            </li>
                          </>
                        );
                      })}

                      <li className="page-item">
                        <a
                          className="page-link"
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            let { currentPage, clickedButtonIndex } =
                              pagination;
                            if (currentPage >= page) {
                              return;
                            }
                            currentPage++;
                            clickedButtonIndex++;
                            setpagination({
                              currentPage,
                              clickedButtonIndex,
                            });
                          }}
                        >
                          <i className="fas fa-angle-right" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <ProductQuickView show={show} handleClose={handleClose}/> */}
    </>
  );
}
