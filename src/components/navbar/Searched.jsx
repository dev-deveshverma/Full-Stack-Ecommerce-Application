import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import slugify from 'slugify';
import { addSearchResult } from '../../Redux/features/searchSlice';

export default function Searched() {
  const searchResults = useSelector((store) => store.searchReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  console.log("searchedpage", searchResults)
  // //!emptying search result store when leaving search page
  //   useEffect(()=>{
  //     console.log('search page first render')
  //     return ()=>{
  //         //dispatch(addSearchResult([]))
  //         console.log('leaving the search page .....')
  //     }
  //   },[])

  return (
    <div>
      <div role="main" className="main" style={{ marginTop: "12rem" }}>
        <section className="page-header page-header-modern page-header page-header-modern bg-color-primary page-header-md m-0">
          <div className="container">
            <div className="row">
              <div className="col-md-12 align-self-center p-static order-2 text-center">
                <h1 className="text-light text-10"><strong>Search</strong></h1>
                <span className="sub-title text-light"> search results  <strong>{searchResults.searchResults.length}</strong></span>
              </div>
              <div className="col-md-12 align-self-center order-1">
                <ul className="breadcrumb d-block text-center breadcrumb-light">
                  <li><a href="/">Home</a></li>
                  <li className="active">Search</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <hr className="m-0" />
        <div className="container py-5 mt-3">
          <div className="row">
            <div className="col">
              <h2 className="font-weight-normal text-7 mb-0">Showing results <strong className="font-weight-extra-bold"></strong></h2>
              <p className="lead mb-0">{searchResults.searchResults.length} results found.</p>
            </div>
          </div>
          <div className="row">
            <div className="col pt-2 mt-1">
              <hr className="my-4" />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <ul className="simple-post-list m-0">

                {
                  searchResults?.searchResults?.map((el) =>

                    <li style={{ display: "flex",cursor:'pointer' }} onClick={(e) => {
                           e.preventDefault();
                           e.stopPropagation()
                      navigate(`/${slugify(el.Subcategory?.sub_categoryName || "")}/${slugify(el.productName || "")}/${el.productId}`)
                    }
                    }>
                      <div className="serachlogo" style={{ marginRight: "2%" }}>
                        <img src={`${process.env.REACT_APP_BASE_URL}${el.productImages[0].filename}`} alt="" style={{ height: "100px" }} />
                      </div>
                      <div className="post-info">
                        <a href={`/${slugify(el.Subcategory?.sub_categoryName || "")}/${slugify(el.productName || "")}/${el.productId}`}>{el.productName}</a>
                        <div className="post-meta">
                          <span className="text-dark text-uppercase font-weight-semibold">{el.productBrand}</span> | ₹ {el.productPrice}
                        </div>
                      </div>
                    </li>
                  )
                }

              </ul>
              {/* <ul className="pagination float-end">
                <li className="page-item"><a className="page-link" href="#"><i className="fas fa-angle-left" /></a></li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item"><a className="page-link" href="#"><i className="fas fa-angle-right" /></a></li>
              </ul> */}
            </div>
          </div>
        </div>

      </div>


    </div>
  )
}
