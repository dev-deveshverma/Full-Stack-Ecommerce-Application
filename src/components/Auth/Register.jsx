import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { createAccountApi } from "../../service/api";

//!! REGEX PATTERN LIST
export const STRING_PATTERN=/^[a-zA-Z]/
export  const EMAIL_PATTERN=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
export const PASSWORD_PATTERN= /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
export const PHONE_PATTERN=/^\d{10}$/
export const showError=(errorMsg)=>{
 Swal.fire("Validation Error",errorMsg,'error');
}
export default function () {
  const [registerInput,setRegisterInput]= useState({
    firstName:'',
    lastName:'',
    email:'',
    password:'',
    gender:''
  })
  const navigate=useNavigate()
   //! validation error state 
 const [errorMessage,setErrorMessage]=useState({
  emailErr:'',
  passwordErr:'',
  firstNameErr:'',
  lastNameErr:'',
  genderErr:'',

 })
//! login api error state 
const [isLoggedIn,setIsLoggedIn] = useState(null)

  const handleChange= (event)=>{
     const {value, name}=event.target;
     //** reseting error messages */
     setErrorMessage({
      firstNameErr:'',
      lastNameErr:'',
      emailErrErr:'',
      genderErr:'',
      passwordErr:''

     })
      setRegisterInput({...registerInput, [name]:value})
  }
console.log( registerInput)
  const handleSubmit= (e)=>{
      e.preventDefault();
      const {firstName,lastName,email,gender,password}= registerInput
      //! validaton check 
      if(!STRING_PATTERN.test(firstName)){
       setErrorMessage({firstNameErr:"First name must be a set valid alphabates characters",lastNameErr:'',emailErr:'',passwordErr:'',genderErr:''})
        return 
      }
      if(!STRING_PATTERN.test(lastName)){
        setErrorMessage({firstNameErr:"",lastNameErr:'Last name must be a set valid alphabates characters',emailErr:'',passwordErr:'',genderErr:''})
        return 
      }
      if(!EMAIL_PATTERN.test(email)){
        setErrorMessage({firstNameErr:"",lastNameErr:'',emailErr:'Invalid email address',passwordErr:'',genderErr:''})
        return 
      }
      if(!PASSWORD_PATTERN.test(password)){
        setErrorMessage({firstNameErr:"",lastNameErr:'Last name must be a set valid alphabates characters',emailErr:'',passwordErr:'Password must contains alphanumeric (i.e @Ab12345) character of 8 length',genderErr:''})
        return 
      }
      if(!STRING_PATTERN.test(gender)){
        setErrorMessage({firstNameErr:"",lastNameErr:'',emailErr:'',passwordErr:'',genderErr:'Please select a gender '})
        return 
      }
     //** calling createAccount api */
     createAccountApi(registerInput).then((res)=>{
      navigate('/login')
      console.log('account created',res.data)
      
     }).catch((err)=>{
      const {response}= err;
        const errorMsg= response.data?.message;
        setIsLoggedIn(errorMsg)
      console.log('error creating account',err)
    
     })
  }

  return (
    <div>
      <div>
        <div role="main" className="main shop py-4" style={{marginTop:'12rem'}}>
          <div className="container py-4">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-5">
                <h2 className="font-weight-bold text-5 mb-0">Register</h2>
                <form id="frmSignUp" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="form-group col">
                      {errorMessage.firstNameErr?<label className="form-label text-color-danger text-3">
                     {errorMessage.firstNameErr} <span className="text-color-danger">*</span>
                      </label>:<label className="form-label text-color-dark text-3">
                      First Name <span className="text-color-danger">*</span>
                      </label>}
                      <input
                        type="text"
                        className={`form-control form-control-lg text-4 ${errorMessage.firstNameErr?"border-danger":''}`}
                        name="firstName"
                       onChange={handleChange}
                       value={registerInput.firstName}
                        
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                     {
                      errorMessage.lastNameErr? <label className="form-label text-color-danger text-3">
                     {errorMessage.lastNameErr} <span className="text-color-danger">*</span>
                    </label>: <label className="form-label text-color-dark text-3">
                        Last Name <span className="text-color-danger">*</span>
                      </label>
                     }
                      <input
                        type="text"
                        className={`form-control form-control-lg text-4 v${errorMessage.lastNameErr?"border-danger":''}`}
                        placeholder="i.e jhon"
                        name="lastName"
                        onChange={handleChange}
                        value={registerInput.lastName}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                     {
                      errorMessage.emailErr? <label className="form-label text-color-dark text-3">
                     {errorMessage.emailErr}
                      <span className="text-color-danger">*</span>
                    </label>: <label className="form-label text-color-dark text-3">
                        Username (email address){" "}
                        <span className="text-color-danger">*</span>
                      </label>
                     }
                      <input
                        type="text"
                        className={`form-control form-control-lg text-4 v${errorMessage.emailErr?"border-danger":''}`}
                        placeholder="i.e jhon@gmail.com"
                        name="email"
                        onChange={handleChange}
                        value={registerInput.email}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                    {
                      errorMessage.passwordErr?  <label className="form-label text-color-dark text-3">
                     {errorMessage.passwordErr} <span className="text-color-danger">*</span>
                    </label>:  <label className="form-label text-color-dark text-3">
                        Password <span className="text-color-danger">*</span>
                      </label>
                    }
                      <input
                        type="password"
                        className={`form-control form-control-lg text-4 v${errorMessage.passwordErr?"border-danger":''}`}
                        placeholder="password"
                        name="password"
                        onChange={handleChange}
                        value={registerInput.password}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                     {
                      errorMessage.genderErr? <label className="form-label text-color-danger text-3">
                      {errorMessage.genderErr} <span className="text-color-danger">*</span>
                    </label>: <label className="form-label text-color-dark text-3">
                        Gender <span className="text-color-danger">*</span>
                      </label>
                     }
                      <div className="custom-select-1">
                        <select
                          id="user_time_zone"
                          className={`form-control text-3 h-auto py-2 ${errorMessage.genderErr?"border-danger":''}`}
                          name="gender"
                          
                          onChange={handleChange}
                          value={registerInput.gender}
                          size={0}
                        ><option >Choose</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <p className="text-2 mb-2">
                        Your personal data will be used to support your
                        experience throughout this website, to manage access to
                        your account, and for other purposes described in our{" "}
                        <a href="#" className="text-decoration-none">
                          privacy policy.
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group col">
                      <button
                        type="submit"
                        className="btn btn-dark btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3"
                        data-loading-text="Loading..."
                        onClick={handleSubmit}
                      >
                        Register
                      </button>
                      {
                        isLoggedIn &&  <label className="form-label text-color-danger text-3">
                      {isLoggedIn} <span className="text-color-danger">*</span>
                      </label>
                      }
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
