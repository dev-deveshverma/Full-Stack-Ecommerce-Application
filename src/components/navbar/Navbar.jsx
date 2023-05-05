import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addItemInCart } from "../../Redux/features/cartSlice";
import { updateProduct } from "../../Redux/features/getallproductSlice";
import { logout } from "../../Redux/features/loginSlice";
import { addSearchResult } from "../../Redux/features/searchSlice";
import {
  getallCategory,
  getallProduct,
  getallProducts,
  getallProductsBySubCategoryId,
} from "../../service/api";
import SearchRes from "./SearchRes";
import TopHeader from "./TopHeader";
export const categoryProductHelper = (records) => {
  let finalProductList = [];
  for (let i = 0; i < records.length; i++) {
    finalProductList.push(...records[i].Products);
  }
  return finalProductList;
};
export default function Navbar() {
  //**** react reduxs  hooks */
  const disptach = useDispatch();
  const navigate = useNavigate();

  //** accessing search redux store  */
  const searchResults = useSelector((store) => store.searchReducer);
  const { token, user } = useSelector((store) => store.loginReducer);
  const { cartData,favouriteList } = useSelector((store) => store.cartReducer);
  const [allcategories, setAllcategories] = useState();

  //******## all the states of the navbar component ********/
  //!! collapsed navbar on mobile devices state change
  const [showCollapsedNav, setShowCollapsedNav] = useState(false);
  const [searchText, setSearchText] = React.useState("");
  //*** Selected Category Search State */
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMainCategoryActive, setIsMainCategoryActive] = useState({
    isHomeCategoryActive: true,
    isTopProductCategoryActive: false,
    isSummerSellCategoryActive: false,
    isHurryupCategoryActive: false,
    isPortfolioCategoryActive: false,
    isBlogCategoryActive: false,
  });

  //*** All the function and used side effect hook start  */

  const getllproductReducer = async () => {
    try {
      const getcategories = await getallCategory();
      setAllcategories(getcategories.data);
    } catch (error) {
      console.log(error);
    }
  };
  let searchWaiting;
  React.useEffect(() => {
    if (searchText.length < 1) {
      return;
    }
    searchWaiting = setTimeout(() => {
      axios
        .get(`${process.env.REACT_APP_API_URL}/products?search=${searchText}`)
        .then((res) => {
          disptach(addSearchResult(res.data));
          console.log("search result", res);
        })
        .catch((err) => {
          console.log("error", err);
        });
    }, 1000);
    return () => {
      //  disptach(addSearchResult([]))
      clearTimeout(searchWaiting);
    };
  }, [searchText]);

  useEffect(() => {
    getllproductReducer();
  }, []);
  //! effect to fetch all products of selected category
  useEffect(() => {
    if (selectedCategory !== "All") {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/subCategory/category/${selectedCategory}`
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
  }, [selectedCategory]);
  console.log("allcategories", allcategories);

  //! subcategory filter handler function
  const getSubCategoryProducts = (subCategoryId) => {
    getallProductsBySubCategoryId(subCategoryId)
      .then((products) => {
        console.log("selected subcategory result ", products);
        const contvertedProductlist = categoryProductHelper(products.data);
        disptach(updateProduct(contvertedProductlist));
      })
      .catch((err) => {
        console.log("error while fetching subcategory products", err);
      });
  };

  return (
    <>
      {/*//! home page loading popup nav */}
      <div className="notice-top-bar bg-primary" data-sticky-start-at="180">
        <button
          className="hamburguer-btn hamburguer-btn-light notice-top-bar-close m-0 active"
          data-set-active="false"
        >
          <span className="close">
            <span></span>
            <span></span>
          </span>
        </button>
        <div className="container">
          <div className="row justify-content-center py-2">
            <div className="col-9 col-md-12 text-center">
              <p className="text-color-light font-weight-semibold mb-0">
                Get Up to <strong>40% OFF</strong> New-Season Styles{" "}
                <a
                  href="#"
                  className="btn btn-primary-scale-2 btn-modern btn-px-2 btn-py-1 ms-2"
                >
                  MEN
                </a>{" "}
                <a
                  href="#"
                  className="btn btn-primary-scale-2 btn-modern btn-px-2 btn-py-1 ms-1 me-2"
                >
                  WOMAN
                </a>{" "}
                <span className="opacity-6 text-1">* Limited time only.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/*//! home page main navbar */}
      <header
        id="header"
        style={{ position: "fixed", zIndex: "100", top: 0, width: "100%" }}
        data-plugin-options="{'stickyEnabled': true, 'stickyEnableOnBoxed': true, 'stickyEnableOnMobile': false, 'stickyStartAt': 135, 'stickySetTop': '-135px', 'stickyChangeLogo': true}"
      >
        <div className="header-body header-body-bottom-border-fixed box-shadow-none border-top-0">
          {/* main nav top content bar */}
          <TopHeader />
          {/* //?? product  search and user profile menus */}
          <div className="header-container container">
            <div className="header-row py-2">
              <div className="header-column w-100">
                <div className="header-row justify-content-between">
                  <div className="header-logo z-index-2 col-lg-2 px-0">
                    <a href="#">
                      <Link to={"/"}>
                        <img
                          alt="Porto"
                          width={100}
                          height={48}
                          data-sticky-width={82}
                          data-sticky-height={40}
                          data-sticky-top={84}
                          src="https://i.ibb.co/8r7FCM1/7cac6b9e60404132a5a99a36d6aaf474-removebg-preview.png"
                        />
                      </Link>
                    </a>
                  </div>
                  <div className="header-nav-features header-nav-features-no-border col-lg-5 col-xl-6 px-0 ms-0">
                    <div className="header-nav-feature ps-lg-5 pe-lg-4">
                      <form role="search">
                        <div className="search-with-select">
                          <a
                            href="#"
                            className="mobile-search-toggle-btn me-2"
                            data-toggle-class="open"
                          >
                            {/* <i className="icons icon-magnifier text-color-dark text-color-hover-primary" /> */}
                          </a>
                          <div className="search-form-wrapper input-group">
                            <input
                              className="form-control text-1"
                              id="headerSearch"
                              name="search"
                              type="search"
                              placeholder="Search..."
                              onChange={(e) => {
                                setSearchText(e.target.value);
                              }}
                            />
                            <div className="search-form-select-wrapper">
                              <div className="custom-select-1">
                                <select
                                  name="category"
                                  className="form-control form-select"
                                  value={selectedCategory}
                                  onChange={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSelectedCategory(e.target.value);
                                  }}
                                >
                                  <option value={"All"} selected>
                                    All Categories
                                  </option>
                                  {allcategories?.map((el) => (
                                    <option value={el.category_Id}>
                                      {el.categoryName}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <button
                                className="btn"
                                type="submit"
                                onClick={(event) => {
                                  event.preventDefault();
                                  navigate("/searched");
                                }}
                              >
                                <i className="icons icon-magnifier header-nav-top-icon text-color-dark" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <ul className="header-extra-info col-lg-3 col-xl-2 ps-2 ps-xl-0 ms-lg-3 d-none d-lg-block">
                    <li className="d-none d-sm-inline-flex ms-0"></li>
                  </ul>
                  <div className="d-flex col-auto col-lg-2 pe-0 ps-0 ps-xl-3">
                    <ul className="header-extra-info">
                      <li className="ms-0 ms-xl-4">
                        {token !== "" && (
                          <div className="header-extra-info-icon">
                            <a
                              href="#"
                              className="text-decoration-none text-color-dark text-color-hover-primary text-2"
                            >
                              <Link
                                to={"/userprofile"}
                                style={{
                                  textDecoration: "none",
                                  color: "black",
                                }}
                              >
                                <img
                                  src={`${process.env.REACT_APP_BASE_URL}/${user.profile_pic}`}
                                  className="icons icon-user text-color-hover-primary border"
                                  width={"35rem"}
                                  height="35rem"
                                  style={{
                                    borderRadius: "50%",
                                    marginTop: "-.5rem",
                                  }}
                                />
                                {/* <i className="icons icon-user text-color-hover-primary" /> */}
                              </Link>
                            </a>
                          </div>
                        )}
                      </li>
                      <li className="me-2 ms-3">
                        <div className="header-extra-info-icon">
                          <a
                            href=""
                            onClick={(e) => {
                              e.preventDefault();
                              navigate("/user/fevorate");
                            }}
                            className="text-decoration-none text-color-dark text-color-hover-primary text-2"
                          >
                            {/* //!!  fevorate icon */}
                            <i className="icons icon-heart " />
                          {favouriteList.length>0 && <span className="cart-info">
                             <span
                              className="cart-qty position-absolute"
                              style={{ fontSize: "1rem" }}
                            >
                              {favouriteList.length}
                            </span>
                             </span>}
                          </a>
                        </div>
                      </li>
                    </ul>
                    <div className="header-nav-features ps-0 ms-1">
                      <div className="header-nav-feature header-nav-features-cart header-nav-features-cart-big d-inline-flex top-2 ms-2">
                        <a href="#" className="header-nav-features-toggle">
                          <Link to={"/cart"}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              fill="currentColor"
                              className=" bi bi-bag header-nav-top-icon-img text-color-hover-primary"
                              viewBox="0 0 16 16"
                            >
                              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                            </svg>
                            {/* <img
                              src="../src/icon-cart-big.svg"
                              height={30}
                              alt
                              className="header-nav-top-icon-img"
                            /> */}
                            <span className="cart-info">
                              {cartData.length ? (
                                <span className="cart-qty">
                                  {cartData.length}
                                </span>
                              ) : (
                                <span></span>
                              )}
                            </span>
                          </Link>
                        </a>
                        <div
                          className="header-nav-features-dropdown"
                          id="headerTopCartDropdown"
                        >
                          <ol className="mini-products-list">
                            <li className="item">
                              <a
                                href="#"
                                title="Camera X1000"
                                className="product-image"
                              >
                                <img
                                  src="img/products/product-1.jpg"
                                  alt="Camera X1000"
                                />
                              </a>
                              <div className="product-details">
                                <p className="product-name">
                                  <a href="#">Camera X1000 </a>
                                </p>
                                <p className="qty-price">
                                  1X <span className="price">$890</span>
                                </p>
                                <a
                                  href="#"
                                  title="Remove This Item"
                                  className="btn-remove"
                                >
                                  <i className="fas fa-times" />
                                </a>
                              </div>
                            </li>
                          </ol>
                          <div className="totals">
                            <span className="label">Total:</span>
                            <span className="price-total">
                              <span className="price">$890</span>
                            </span>
                          </div>
                          <div className="actions">
                            <a className="btn btn-dark" href="#">
                              View Cart
                            </a>
                            <a className="btn btn-primary" href="#">
                              Checkout
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="header-column justify-content-end">
                <div className="header-row"></div>
              </div>
            </div>
          </div>
          <div className="header-nav-bar header-nav-bar-top-border bg-light">
            {/* //!! {Categoryies menu bar} */}
            <div className="header-container container">
              <div className="header-row">
                <div className="header-column">
                  <div className="header-row justify-content-end">
                    <div
                      className="header-nav header-nav-line header-nav-top-line header-nav-top-line-with-border justify-content-start"
                      data-sticky-header-style="{'minResolution': 991}"
                      data-sticky-header-style-active="{'margin-left': '105px'}"
                      data-sticky-header-style-deactive="{'margin-left': '0'}"
                    >
                      <div className="header-nav-main header-nav-main-square header-nav-main-dropdown-no-borders header-nav-main-effect-3 header-nav-main-sub-effect-1 w-100">
                        <nav
                          className={`collapse w-100 ${
                            showCollapsedNav ? "show" : ""
                          }`}
                        >
                          <ul className="nav nav-pills w-100" id="mainNav">
                            <li className="dropdown">
                              <a
                                className={`dropdown-item dropdown-toggle ${
                                  isMainCategoryActive.isHomeCategoryActive
                                    ? "active"
                                    : ""
                                }`}
                                href="#"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsMainCategoryActive({
                                    isHomeCategoryActive: true,
                                    isTopProductCategoryActive: false,
                                    isSummerSellCategoryActive: false,
                                    isHurryupCategoryActive: false,
                                    isPortfolioCategoryActive: false,
                                    isBlogCategoryActive: false,
                                  });
                                  axios
                                    .get(
                                      `${process.env.REACT_APP_API_URL}/products?limit=6`
                                    )
                                    .then((res) => {
                                      console.log(
                                        "all category result  ",
                                        res.data
                                      );

                                      disptach(updateProduct(res.data));
                                    })
                                    .catch((err) => {
                                      console.log(
                                        "error while fetching category req",
                                        err
                                      );
                                    });
                                }}
                              >
                                Home
                                {showCollapsedNav && (
                                  <i class="fas fa-chevron-down"></i>
                                )}
                              </a>
                            </li>
                            <li className="dropdown dropdown-mega">
                              <a
                                className={`dropdown-item dropdown-toggle ${
                                  isMainCategoryActive.isTopProductCategoryActive
                                    ? "active"
                                    : ""
                                }`}
                                href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsMainCategoryActive({
                                    isHomeCategoryActive: false,
                                    isTopProductCategoryActive: true,
                                    isSummerSellCategoryActive: false,
                                    isHurryupCategoryActive: false,
                                    isPortfolioCategoryActive: false,
                                    isBlogCategoryActive: false,
                                  });
                                }}
                              >
                                Top Categories
                                {showCollapsedNav && (
                                  <i class="fas fa-chevron-down"></i>
                                )}
                              </a>
                              <ul className="dropdown-menu">
                                <li>
                                  <div className="dropdown-mega-content">
                                    <div className="row">
                                      {allcategories &&
                                        allcategories.map((category) => {
                                          return (
                                            <div className="col-lg-3">
                                              <span className="dropdown-mega-sub-title">
                                                {category.categoryName}
                                              </span>
                                              <ul className="dropdown-mega-sub-nav">
                                                {category.Subcategories &&
                                                  category.Subcategories.map(
                                                    (subcategory) => {
                                                      return (
                                                        <li>
                                                          <a
                                                            className="dropdown-item"
                                                            href="#"
                                                            onClick={(e) => {
                                                              e.preventDefault();
                                                              e.stopPropagation();
                                                              getSubCategoryProducts(
                                                                subcategory.sub_categoryId
                                                              );
                                                            }}
                                                          >
                                                            {
                                                              subcategory.sub_categoryName
                                                            }
                                                          </a>
                                                        </li>
                                                      );
                                                    }
                                                  )}
                                              </ul>
                                            </div>
                                          );
                                        })}

                                      {/* <div className="col-lg-3">
                                        <span className="dropdown-mega-sub-title">
                                          Boy's top products
                                        </span>
                                        <ul className="dropdown-mega-sub-nav">
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              T Shirts
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Jeans
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Trousers
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Sport Shoose
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Watches
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Smart Gadgets
                                            </a>
                                          </li>
                                          <li>
                                            <a
                                              className="dropdown-item"
                                              href="#"
                                            >
                                              Summer wears
                                            </a>
                                          </li>
                                        </ul>
                                      </div> */}
                                    </div>
                                  </div>
                                </li>
                              </ul>
                            </li>
                            <li className="dropdown">
                              <a
                                className={`dropdown-item dropdown-toggle ${
                                  isMainCategoryActive.isSummerSellCategoryActive
                                    ? "active"
                                    : ""
                                }`}
                                href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsMainCategoryActive({
                                    isHomeCategoryActive: false,
                                    isTopProductCategoryActive: false,
                                    isSummerSellCategoryActive: true,
                                    isHurryupCategoryActive: false,
                                    isPortfolioCategoryActive: false,
                                    isBlogCategoryActive: false,
                                  });
                                }}
                              >
                                Summer Sell
                                {showCollapsedNav && (
                                  <i class="fas fa-chevron-down"></i>
                                )}
                              </a>
                            </li>
                            <li className="dropdown">
                              <a
                                className={`dropdown-item dropdown-toggle ${
                                  isMainCategoryActive.isHurryupCategoryActive
                                    ? "active"
                                    : ""
                                }`}
                                href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsMainCategoryActive({
                                    isHomeCategoryActive: false,
                                    isTopProductCategoryActive: false,
                                    isSummerSellCategoryActive: false,
                                    isHurryupCategoryActive: true,
                                    isPortfolioCategoryActive: false,
                                    isBlogCategoryActive: false,
                                  });
                                }}
                              >
                                Hurry up sell
                                {showCollapsedNav && (
                                  <i class="fas fa-chevron-down"></i>
                                )}
                              </a>
                            </li>
                            <li className="dropdown">
                              <a
                                className={`dropdown-item dropdown-toggle ${
                                  isMainCategoryActive.isPortfolioCategoryActive
                                    ? "active"
                                    : ""
                                }`}
                                href=""
                                onClick={(e) => {
                                  e.preventDefault();
                                  setIsMainCategoryActive({
                                    isHomeCategoryActive: false,
                                    isTopProductCategoryActive: false,
                                    isSummerSellCategoryActive: false,
                                    isHurryupCategoryActive: false,
                                    isPortfolioCategoryActive: true,
                                    isBlogCategoryActive: false,
                                  });
                                }}
                              >
                                Portfolio
                                {showCollapsedNav && (
                                  <i class="fas fa-chevron-down"></i>
                                )}
                              </a>
                              {/* <ul className="dropdown-menu">
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Single Project</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="portfolio-single-wide-slider.html">Wide Slider</a></li>
                              <li><a className="dropdown-item" href="portfolio-single-small-slider.html">Small Slider</a></li>
                              <li><a className="dropdown-item" href="portfolio-single-full-width-slider.html">Full Width Slider</a></li>
                              <li><a className="dropdown-item" href="portfolio-single-gallery.html">Gallery</a></li>
                              <li><a className="dropdown-item" href="portfolio-single-carousel.html">Carousel</a></li>
                              <li><a className="dropdown-item" href="portfolio-single-medias.html">Medias</a></li>
                              <li><a className="dropdown-item" href="portfolio-single-full-width-video.html">Full Width Video</a></li>
                              <li><a className="dropdown-item" href="portfolio-single-masonry-images.html">Masonry Images</a></li>
                              <li><a className="dropdown-item" href="portfolio-single-left-sidebar.html">Left Sidebar</a></li>
                              <li><a className="dropdown-item" href="portfolio-single-right-sidebar.html">Right Sidebar</a></li>
                              <li><a className="dropdown-item" href="portfolio-single-left-and-right-sidebars.html">Left and Right Sidebars</a></li>
                              <li><a className="dropdown-item" href="portfolio-single-sticky-sidebar.html">Sticky Sidebar</a></li>
                              <li><a className="dropdown-item" href="portfolio-single-extended.html">Extended</a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Grid Layouts</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="portfolio-grid-1-column.html">1 Column</a></li>
                              <li><a className="dropdown-item" href="portfolio-grid-2-columns.html">2 Columns</a></li>
                              <li><a className="dropdown-item" href="portfolio-grid-3-columns.html">3 Columns</a></li>
                              <li><a className="dropdown-item" href="portfolio-grid-4-columns.html">4 Columns</a></li>
                              <li><a className="dropdown-item" href="portfolio-grid-5-columns.html">5 Columns</a></li>
                              <li><a className="dropdown-item" href="portfolio-grid-6-columns.html">6 Columns</a></li>
                              <li><a className="dropdown-item" href="portfolio-grid-no-margins.html">No Margins</a></li>
                              <li><a className="dropdown-item" href="portfolio-grid-full-width.html">Full Width</a></li>
                              <li><a className="dropdown-item" href="portfolio-grid-full-width-no-margins.html">Full Width No Margins</a></li>
                              <li><a className="dropdown-item" href="portfolio-grid-1-column-title-and-description.html">Title and Description</a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Masonry Layouts</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="portfolio-masonry-2-columns.html">2 Columns</a></li>
                              <li><a className="dropdown-item" href="portfolio-masonry-3-columns.html">3 Columns</a></li>
                              <li><a className="dropdown-item" href="portfolio-masonry-4-columns.html">4 Columns</a></li>
                              <li><a className="dropdown-item" href="portfolio-masonry-5-columns.html">5 Columns</a></li>
                              <li><a className="dropdown-item" href="portfolio-masonry-6-columns.html">6 Columns</a></li>
                              <li><a className="dropdown-item" href="portfolio-masonry-no-margins.html">No Margins</a></li>
                              <li><a className="dropdown-item" href="portfolio-masonry-full-width.html">Full Width</a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Sidebar Layouts</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="portfolio-sidebar-left.html">Left Sidebar</a></li>
                              <li><a className="dropdown-item" href="portfolio-sidebar-right.html">Right Sidebar</a></li>
                              <li><a className="dropdown-item" href="portfolio-sidebar-left-and-right.html">Left and Right Sidebars</a></li>
                              <li><a className="dropdown-item" href="portfolio-sidebar-sticky.html">Sticky Sidebar</a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Ajax</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="portfolio-ajax-page.html">Ajax on Page</a></li>
                              <li><a className="dropdown-item" href="portfolio-ajax-modal.html">Ajax on Modal</a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Extra</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="portfolio-extra-timeline.html">Timeline</a></li>
                              <li><a className="dropdown-item" href="portfolio-extra-lightbox.html">Lightbox</a></li>
                              <li><a className="dropdown-item" href="portfolio-extra-load-more.html">Load More</a></li>
                              <li><a className="dropdown-item" href="portfolio-extra-infinite-scroll.html">Infinite Scroll</a></li>
                              <li><a className="dropdown-item" href="portfolio-extra-lazy-load-masonry.html">Lazy Load Masonry</a></li>
                              <li><a className="dropdown-item" href="portfolio-extra-pagination.html">Pagination</a></li>
                              <li><a className="dropdown-item" href="portfolio-extra-combination-filters.html">Combination Filters</a></li>
                            </ul>
                          </li>
                        </ul> */}
                            </li>
                            <li className="dropdown">
                              <a
                                className={`dropdown-item dropdown-toggle ${
                                  isMainCategoryActive.isBlogCategoryActive
                                    ? "active"
                                    : ""
                                }`}
                                onClick={(e) => {
                                  // e.preventDefault()
                                  setIsMainCategoryActive({
                                    isHomeCategoryActive: false,
                                    isTopProductCategoryActive: false,
                                    isSummerSellCategoryActive: false,
                                    isHurryupCategoryActive: false,
                                    isPortfolioCategoryActive: false,
                                    isBlogCategoryActive: true,
                                  });
                                }}
                                href="http://192.46.209.205:3000/"
                                target={"_blank"}
                              >
                                Blog
                                {showCollapsedNav && (
                                  <i class="fas fa-chevron-down"></i>
                                )}
                              </a>
                              {/* <ul className="dropdown-menu">
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Large Image</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="blog-large-image-full-width.html">Full Width</a></li>
                              <li><a className="dropdown-item" href="blog-large-image-sidebar-left.html">Left Sidebar</a></li>
                              <li><a className="dropdown-item" href="blog-large-image-sidebar-right.html">Right Sidebar </a></li>
                              <li><a className="dropdown-item" href="blog-large-image-sidebar-left-and-right.html">Left and Right Sidebar</a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Medium Image</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="blog-medium-image-sidebar-left.html">Left Sidebar</a></li>
                              <li><a className="dropdown-item" href="blog-medium-image-sidebar-right.html">Right Sidebar </a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Grid</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="blog-grid-4-columns.html">4 Columns</a></li>
                              <li><a className="dropdown-item" href="blog-grid-3-columns.html">3 Columns</a></li>
                              <li><a className="dropdown-item" href="blog-grid-full-width.html">Full Width</a></li>
                              <li><a className="dropdown-item" href="blog-grid-no-margins.html">No Margins</a></li>
                              <li><a className="dropdown-item" href="blog-grid-no-margins-full-width.html">No Margins Full Width</a></li>
                              <li><a className="dropdown-item" href="blog-grid-sidebar-left.html">Left Sidebar</a></li>
                              <li><a className="dropdown-item" href="blog-grid-sidebar-right.html">Right Sidebar </a></li>
                              <li><a className="dropdown-item" href="blog-grid-sidebar-left-and-right.html">Left and Right Sidebar</a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Masonry</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="blog-masonry-4-columns.html">4 Columns</a></li>
                              <li><a className="dropdown-item" href="blog-masonry-3-columns.html">3 Columns</a></li>
                              <li><a className="dropdown-item" href="blog-masonry-full-width.html">Full Width</a></li>
                              <li><a className="dropdown-item" href="blog-masonry-no-margins.html">No Margins</a></li>
                              <li><a className="dropdown-item" href="blog-masonry-no-margins-full-width.html">No Margins Full Width</a></li>
                              <li><a className="dropdown-item" href="blog-masonry-sidebar-left.html">Left Sidebar</a></li>
                              <li><a className="dropdown-item" href="blog-masonry-sidebar-right.html">Right Sidebar </a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Timeline</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="blog-timeline.html">Full Width</a></li>
                              <li><a className="dropdown-item" href="blog-timeline-sidebar-left.html">Left Sidebar</a></li>
                              <li><a className="dropdown-item" href="blog-timeline-sidebar-right.html">Right Sidebar </a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Single Post</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="blog-post.html">Full Width</a></li>
                              <li><a className="dropdown-item" href="blog-post-slider-gallery.html">Slider Gallery</a></li>
                              <li><a className="dropdown-item" href="blog-post-image-gallery.html">Image Gallery</a></li>
                              <li><a className="dropdown-item" href="blog-post-embedded-video.html">Embedded Video</a></li>
                              <li><a className="dropdown-item" href="blog-post-html5-video.html">HTML5 Video</a></li>
                              <li><a className="dropdown-item" href="blog-post-blockquote.html">Blockquote</a></li>
                              <li><a className="dropdown-item" href="blog-post-link.html">Link</a></li>
                              <li><a className="dropdown-item" href="blog-post-embedded-audio.html">Embedded Audio</a></li>
                              <li><a className="dropdown-item" href="blog-post-small-image.html">Small Image</a></li>
                              <li><a className="dropdown-item" href="blog-post-sidebar-left.html">Left Sidebar</a></li>
                              <li><a className="dropdown-item" href="blog-post-sidebar-right.html">Right Sidebar </a></li>
                              <li><a className="dropdown-item" href="blog-post-sidebar-left-and-right.html">Left and Right Sidebar</a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Post Comments</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="blog-post.html#comments">Default</a></li>
                              <li><a className="dropdown-item" href="blog-post-comments-facebook.html#comments">Facebook Comments</a></li>
                              <li><a className="dropdown-item" href="blog-post-comments-disqus.html#comments">Disqus Comments</a></li>
                            </ul>
                          </li>
                        </ul> */}
                            </li>
                            <li className="dropdown">
                              {/* <a
                                className="dropdown-item dropdown-toggle "
                                href="#"
                              >
                                Shop
                                {showCollapsedNav && (
                                  <i class="fas fa-chevron-down"></i>
                                )}
                              </a> */}
                              {/* <ul className="dropdown-menu">
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">Single Product</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="shop-product-full-width.html">Full Width</a></li>
                              <li><a className="dropdown-item" href="shop-product-sidebar-left.html">Left Sidebar</a></li>
                              <li><a className="dropdown-item" href="shop-product-sidebar-right.html">Right Sidebar</a></li>
                              <li><a className="dropdown-item" href="shop-product-sidebar-left-and-right.html">Left and Right Sidebar</a></li>
                            </ul>
                          </li>
                          <li><a className="dropdown-item" href="shop-4-columns.html">4 Columns</a></li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">3 Columns</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="shop-3-columns-full-width.html">Full Width</a></li>
                              <li><a className="dropdown-item" href="shop-3-columns-sidebar-left.html">Left Sidebar</a></li>
                              <li><a className="dropdown-item" href="shop-3-columns-sidebar-right.html">Right Sidebar </a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">2 Columns</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="shop-2-columns-full-width.html">Full Width</a></li>
                              <li><a className="dropdown-item" href="shop-2-columns-sidebar-left.html">Left Sidebar</a></li>
                              <li><a className="dropdown-item" href="shop-2-columns-sidebar-right.html">Right Sidebar </a></li>
                              <li><a className="dropdown-item" href="shop-2-columns-sidebar-left-and-right.html">Left and Right Sidebar</a></li>
                            </ul>
                          </li>
                          <li className="dropdown-submenu">
                            <a className="dropdown-item" href="#">1 Column</a>
                            <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="shop-1-column-full-width.html">Full Width</a></li>
                              <li><a className="dropdown-item" href="shop-1-column-sidebar-left.html">Left Sidebar</a></li>
                              <li><a className="dropdown-item" href="shop-1-column-sidebar-right.html">Right Sidebar </a></li>
                              <li><a className="dropdown-item" href="shop-1-column-sidebar-left-and-right.html">Left and Right Sidebar</a></li>
                            </ul>
                          </li>
                          <li><a className="dropdown-item" href="shop-cart.html">Cart</a></li>
                          <li><a className="dropdown-item" href="shop-login.html">Login</a></li>
                          <li><a className="dropdown-item" href="shop-checkout.html">Checkout</a></li>
                          <li><a className="dropdown-item" href="shop-order-complete.html">Order Complete</a></li>
                        </ul> */}
                            </li>
                            {token === "" ? (
                              <>
                                <li className="dropdown ms-lg-auto">
                                  <a href="#" className="dropdown-item">
                                    <Link
                                      to={"/login"}
                                      style={{ textDecoration: "none" }}
                                    >
                                      Login
                                    </Link>
                                  </a>
                                </li>
                                <li className="dropdown ">
                                  <a href="#" className="dropdown-item">
                                    <Link
                                      to={"./register"}
                                      style={{ textDecoration: "none" }}
                                    >
                                      Signup
                                    </Link>
                                  </a>
                                </li>
                              </>
                            ) : (
                              <>
                                <li className="dropdown ms-lg-auto">
                                  <a
                                    href="#"
                                    className="dropdown-item"
                                    onClick={(e) => {
                                      e.preventDefault();
                                      //? emptying login redux store
                                      disptach(logout());
                                      // disptach(addItemInCart([]));
                                    }}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      fill="red"
                                      class="bi bi-box-arrow-left"
                                      viewBox="0 0 16 16"
                                      style={{ marginRight: ".5rem" }}
                                    >
                                      <path
                                        fill-rule="evenodd"
                                        d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z"
                                      />
                                      <path
                                        fill-rule="evenodd"
                                        d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"
                                      />
                                    </svg>
                                    Log Out
                                  </a>
                                </li>
                              </>
                            )}
                          </ul>
                        </nav>
                      </div>

                      {/* //!! collapsed nabar for mobile view */}
                      <button
                        className="btn header-btn-collapse-nav"
                        data-bs-toggle="collapse"
                        data-bs-target=".header-nav-main nav"
                        onClick={() => {
                          setShowCollapsedNav(!showCollapsedNav);
                        }}
                      >
                        <i className="fas fa-bars" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <span>
        {/* { searchResults.searchResults.length ? ( <SearchRes searchResults={searchResults}/>):(<>loading</>
         )
        } */}
      </span>
    </>
  );
}
