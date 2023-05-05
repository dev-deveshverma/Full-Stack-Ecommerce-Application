import React from 'react'

export default function Page404() {
  return (
    <>
    <div role="main" className="main">
  <section className="page-header page-header-modern bg-color-light-scale-1 page-header-lg">
    <div className="container">
      <div className="row">
        <div className="col-md-12 align-self-center p-static order-2 text-center">
          <h1 className="font-weight-bold text-dark">404 - Page Not Found</h1>
        </div>
        <div className="col-md-12 align-self-center order-1">
          <ul className="breadcrumb d-block text-center">
            <li><a href="#">Home</a></li>
            <li className="active">Pages</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
  <div className="container">
    <section className="http-error">
      <div className="row justify-content-center py-3">
        <div className="col-md-7 text-center">
          <div className="http-error-main">
            <h2>404!</h2>
            <p>We're sorry, but the page you were looking for doesn't exist.</p>
          </div>
        </div>
        {/* <div className="col-md-4 mt-4 mt-md-0">
          <h4 className="text-primary">Here are some useful links</h4>
          <ul className="nav nav-list flex-column">
            <li className="nav-item"><a className="nav-link" href="#">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#">About Us</a></li>
            <li className="nav-item"><a className="nav-link" href="#">FAQ's</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Sitemap</a></li>
            <li className="nav-item"><a className="nav-link" href="#">Contact Us</a></li>
          </ul>
        </div> */}
      </div>
    </section>
  </div>
</div>
    </>
  )
}
