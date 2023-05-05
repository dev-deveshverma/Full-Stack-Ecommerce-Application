
import React, { useState } from 'react'
import { EMAIL_PATTERN , showError} from '../../Auth/Register';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import { forgetPasswordRequestHandler } from '../../../service/api';

export default function SendForgetPasswordRequest () {
  const [email,setEmail]= useState("");
   //! validation error state 
 const [errorMessage,setErrorMessage]=useState({
  emailErr:''
 })
 //! api success response msg 
 const [isRequestSend,setIsRequestSend]=useState(null)
//! login api error state 
const [apiResponseMsg,setapiResponseMsg] = useState(null)

  const handleChange= (event)=>{
     const {value}=event.target;
     setErrorMessage({emailErr:''})
      setEmail(value)
  }
console.log( email)
  const handleSubmit= (e)=>{
      e.preventDefault();
      //! validaton check 
      if(!EMAIL_PATTERN.test(email)){
       setErrorMessage({emailErr:"Email address is invalid"})
        return 
      }
     //** calling fogetPassword request  api */
     forgetPasswordRequestHandler({email}).then((res)=>{
      console.log('request send',res.data)
      setapiResponseMsg(null)
      setIsRequestSend("Please check your email and follow the given steps !!")
      // Swal.fire('Request Send','Please check your email and follow the given steps !!','success')
     }).catch((err)=>{
      const {response}= err;
      const errorMsg= response.data?.message;
        setIsRequestSend(null)
         setapiResponseMsg("No user exists with the email address?")
      console.log('err while sending req',err)
    
     })
  }


  
  return (
    <div>
        <div role="main" className="main shop py-4" style={{marginTop:'12rem'}}>
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 mb-5 mb-lg-0">
              <h2 className="font-weight-bold text-5 mb-0" style={{wordSpacing:'.5rem'}}>Forget  Password  Request</h2>
              <form id="frmSignIn" onSubmit={handleSubmit}  className="needs-validation">
                <div className="row">
                  <div className="form-group col">
                    {errorMessage.emailErr?<label className="form-label text-color-danger text-3">{errorMessage.emailErr}<span className="text-color-danger">*</span></label>:<label className="form-label text-color-dark text-3">Registered Email address <span className="text-color-danger">*</span></label>}
                    <input name='email' onChange={handleChange} type="text"  className={`form-control form-control-lg text-4 ${errorMessage.emailErr?"border-danger":''}`}  placeholder='registered email for Verification...' value={email} required />
                  </div>
                </div>
               
                <div className="row">
                  <div className="form-group col">
                    <button type="submit" className="btn btn-dark btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3" data-loading-text="Loading..." onClick={handleSubmit}>Send</button>
                    {
                      apiResponseMsg && <label className="form-label text-color-danger text-3">{apiResponseMsg}<span className="text-color-danger">*</span></label>
                    }

                    {isRequestSend && <label className="form-label text-color-danger text-3">{isRequestSend} <span className="text-color-danger">*</span></label>}
                   
                  </div>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}
