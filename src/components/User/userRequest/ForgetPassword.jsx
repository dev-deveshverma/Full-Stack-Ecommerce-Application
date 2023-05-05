
import React, { useState } from 'react'
import { PASSWORD_PATTERN , showError} from '../../Auth/Register';
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { forgetPasswordRequestHandler, resetPasswordRequestHandler } from '../../../service/api';

export default function ForgetPassword() {
  const [password,setPassword]= useState({
    password:'',
    confirmPassword:''
  })
  //! validation error state 
 const [errorMessage,setErrorMessage]=useState({
  confirmPasswordErr:'',
  passwordErr:''
 })
//! login api error state 
const [apiResponseMsg,setapiResponseMsg] = useState(null)
  const {token}= useParams();
  const navigate=useNavigate();

  const handleChange= (event)=>{
     const {value,name}=event.target;
     setErrorMessage({
      confirmPasswordErr:'',
      passwordErr:''
     })
      setPassword({...password, [name]:value})
  }
  const handleSubmit= (e)=>{
      e.preventDefault();
     
      //! validaton check 
      if(!PASSWORD_PATTERN.test(password.password)){
        setErrorMessage({passwordErr:'Password  is invalid and must be at least 8 characters long alphanumeric',confirmPasswordErr:''})
       
        return 
      }
      if(password.confirmPassword!==password.password){
        setErrorMessage({passwordErr:'',confirmPasswordErr:' Confirm password did not match'})
        return 
      }
     //** calling reset Password request  api */
     resetPasswordRequestHandler({password:password.confirmPassword,token}).then((res)=>{
      console.log('password reset result',res.data)
      navigate("/login")

     }).catch((err)=>{
        const {response}= err;
        const errorMsg= response.data?.message;
         setapiResponseMsg(errorMsg)
      console.log('err while sending req',err)
    
     })
  }


  
  return (
    <div>
        <div role="main" className="main shop py-4" style={{marginTop:'12rem'}}>
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 mb-5 mb-lg-0">
              <h2 className="font-weight-bold text-5 mb-0" style={{wordSpacing:'.5rem'}}>Forget  Password  Here</h2>
              <form id="frmSignIn" onSubmit={handleSubmit}  className="needs-validation">
                <div className="row">
                  <div className="form-group col">
                    {
                      errorMessage.passwordErr?<label className="form-label text-color-danger text-3">{errorMessage.passwordErr} <span className="text-color-danger">*</span></label>:<label className="form-label text-color-dark text-3">New Password <span className="text-color-danger">*</span></label>
                    }
                    <input name='password' onChange={handleChange} type="password"   className={`form-control form-control-lg text-4 ${errorMessage.passwordErr?"border-danger":''}`} value={password.password} required />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col">
                   {
                    errorMessage.confirmPasswordErr? <label className="form-label text-color-danger text-3">{errorMessage.confirmPasswordErr} <span className="text-color-danger">*</span></label>: <label>Confirm New Password <span className="text-color-danger">*</span></label>
                   }
                    <input name='confirmPassword' onChange={handleChange} type="password"   className={`form-control form-control-lg text-4 ${errorMessage.confirmPasswordErr?"border-danger":''}`} value={password.confirmPassword} required />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col">
                    <button type="submit" className="btn btn-dark btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3" data-loading-text="Loading..." onClick={handleSubmit}>Submit</button>
                    
                   {apiResponseMsg && <label className="form-label text-color-danger text-3">{apiResponseMsg} <span className="text-color-danger">*</span></label>}
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
