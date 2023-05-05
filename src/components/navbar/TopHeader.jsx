import React from "react";

export default function TopHeader() {
  return (
    <>
      {/* //***top header content  */}
      <div className="header-top header-top-small-minheight header-top-simple-border-bottom">
        <div className="container">
          <div className="header-row justify-content-between">
            <div className="header-column col-auto px-0">
              <div className="header-row">
                <p className="font-weight-semibold text-1 mb-0 d-none d-sm-block d-md-none">
                  The Webpatriot
                </p>
                <p className="font-weight-semibold text-1 mb-0 d-none d-md-block">
                  Welcome to the Webpatriot
                </p>
              </div>
            </div>
            <div className="header-column justify-content-end col-auto px-0">
              <div className="header-row">
                <nav className="header-nav-top">
                  <ul className="nav nav-pills font-weight-semibold text-2">
                    <li className="nav-item dropdown nav-item-left-border d-lg-none">
                      <a
                        className="nav-link text-color-default text-color-hover-primary"
                        href="#"
                        role="button"
                        id="dropdownMobileMore"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        More
                        <i className="fas fa-angle-down" />
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMobileMore"
                      >
                        {/* <a className="dropdown-item" href="#">About</a> */}
                        {/* <a className="dropdown-item" href="#">Our Stores</a> */}
                        <a className="dropdown-item" href="#">
                          Blog
                        </a>
                        {/* <a className="dropdown-item" href="#">Contact</a>
                        <a className="dropdown-item" href="#">Help &amp; FAQs</a>
                        <a className="dropdown-item" href="#">Track Order</a> */}
                      </div>
                    </li>
                    <li className="nav-item d-none d-lg-inline-block">
                      <a
                        href="http://192.46.209.205:3000/"
                        target={"_blank"}
                        className="text-decoration-none text-color-default text-color-hover-primary"
                      >
                        Blog
                      </a>
                    </li>
                    {/* <li className="nav-item d-none d-lg-inline-block">
                      <a
                        href="#"
                        className="text-decoration-none text-color-default text-color-hover-primary"
                      >
                        Our Stores
                      </a>
                    </li>
                    <li className="nav-item d-none d-lg-inline-block">
                      <a
                        href="#"
                        className="text-decoration-none text-color-default text-color-hover-primary"
                      >
                        Blog
                      </a>
                    </li>
                    <li className="nav-item d-none d-lg-inline-block">
                      <a
                        href="#"
                        className="text-decoration-none text-color-default text-color-hover-primary"
                      >
                        Contact
                      </a>
                    </li>
                    <li className="nav-item d-none d-xl-inline-block">
                      <a
                        href="#"
                        className="text-decoration-none text-color-default text-color-hover-primary"
                      >
                        Help &amp; FAQs
                      </a>
                    </li>
                    <li className="nav-item d-none d-xl-inline-block">
                      <a
                        href="#"
                        className="text-decoration-none text-color-default text-color-hover-primary"
                      >
                        Track Order
                      </a>
                    </li>
                    <li className="nav-item dropdown nav-item-left-border">
                      <a
                        className="nav-link text-color-default text-color-hover-primary"
                        href="#"
                        role="button"
                        id="dropdownCurrency"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        USD
                        <i className="fas fa-angle-down" />
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-arrow-centered min-width-0"
                        aria-labelledby="dropdownCurrency"
                      >
                        <a className="dropdown-item" href="#">
                          EUR
                        </a>
                        <a className="dropdown-item" href="#">
                          USD
                        </a>
                      </div>
                    </li>
                    <li className="nav-item dropdown nav-item-right-border">
                      <a
                        className="nav-link text-color-default text-color-hover-primary"
                        href="#"
                        role="button"
                        id="dropdownLanguage"
                        data-bs-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        ENG
                        <i className="fas fa-angle-down" />
                      </a>
                      <div
                        className="dropdown-menu dropdown-menu-arrow-centered min-width-0"
                        aria-labelledby="dropdownLanguage"
                      >
                        <a className="dropdown-item" href="#">
                          ESP
                        </a>
                        <a className="dropdown-item" href="#">
                          FRA
                        </a>
                        <a className="dropdown-item" href="#">
                          ENG
                        </a>
                      </div>
                    </li> */}
                  </ul>
                  <ul className="header-social-icons social-icons social-icons-clean social-icons-icon-gray">
                    <li className="social-icons-facebook">
                      <a
                        href="http://www.facebook.com/"
                        target="_blank"
                        title="Facebook"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                    </li>
                    <li className="social-icons-twitter">
                      <a
                        href="http://www.twitter.com/"
                        target="_blank"
                        title="Twitter"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                    </li>
                    <li className="social-icons-linkedin">
                      <a
                        href="http://www.linkedin.com/"
                        target="_blank"
                        title="Linkedin"
                      >
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
