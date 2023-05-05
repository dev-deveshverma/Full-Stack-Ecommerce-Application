import React, { useEffect, useRef, useState } from "react";
import { loginApiHanlder } from "../../service/api";
import { EMAIL_PATTERN, PASSWORD_PATTERN, showError } from "./Register";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../Redux/features/loginSlice";
import { addItemInCart } from "../../Redux/features/cartSlice";
import { setNewAddress } from "../../Redux/features/addressSlice";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const [verified, setVerified] = useState(false);
  const {pathname}= useLocation();
  console.log('current route: ' + pathname)
  const recpatchaRef=useRef()
  const grecaptchaObject = window.grecaptcha
  const TEST_SITE_KEY = "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI";
  const handelverified = (e) => {
    setVerified(false);
    console.log(e);
  };

  //!log in input state
  const [loginInput, setloginInput] = useState({
    email: "",
    password: "",
  });
  //! validation error state
  const [errorMessage, setErrorMessage] = useState({
    emailErr: "",
    passwordErr: "",
  });
  //! login api error state
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (event) => {
    const { value, name } = event.target;
    //** reseting error states */
    setErrorMessage({ emailErr: "", passwordErr: "" });
    setIsLoggedIn(null);
    setloginInput({ ...loginInput, [name]: value });
  };
  console.log(loginInput);
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = loginInput;
    //! validaton check
    if (!EMAIL_PATTERN.test(email)) {
      setErrorMessage({ ...errorMessage, emailErr: "Invalid email address !" });
      return;
    }
    if (!PASSWORD_PATTERN.test(password)) {
      setErrorMessage({ ...errorMessage, passwordErr: "Invalid password !" });
      return;
    }

    //** calling createAccount api */
    loginApiHanlder(loginInput)
      .then((res) => {
        const { token, user, cartData } = res.data;
        // console.log('account created',res.data)
        // Swal.fire('Logged successfully','operation success','success');
        //? updating login store
        dispatch(loginSuccess({ token, user, cartData }));
        //? updating address store
        dispatch(setNewAddress(user.Addresses));
        navigate("/");
      })
      .catch((err) => {
        const { response } = err;
        const errorMsg = response.data?.message;
        setIsLoggedIn(errorMsg);
        // Swal.fire('Operation failed !',errorMsg,'error')
        console.log("error creating account", err);
      });
  };
  useEffect(() => {
    return () => {
     recpatchaRef.current?.reset();
    };
  }, []);

  return (
    <div>
      <div
        role="main"
        className="main shop py-4"
        style={{ marginTop: "12rem" }}
      >
        <div className="container py-4">
          <div className="row justify-content-center">
            <div className="col-md-6 col-lg-5 mb-5 mb-lg-0">
              <h2 className="font-weight-bold text-5 mb-0">Login</h2>
              <form
                id="frmSignIn"
                onSubmit={handleSubmit}
                className="needs-validation"
              >
                <div className="row">
                  <div className="form-group col">
                    {errorMessage.emailErr ? (
                      <label className="form-label text-color-danger text-3">
                        {errorMessage.emailErr}{" "}
                        <span className="text-color-danger">*</span>
                      </label>
                    ) : (
                      <label className="form-label text-color-dark text-3">
                        Email address{" "}
                        <span className="text-color-danger">*</span>
                      </label>
                    )}
                    <input
                      name="email"
                      onChange={handleChange}
                      type="text"
                      className="form-control form-control-lg text-4"
                      required
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col">
                    {errorMessage.passwordErr ? (
                      <label className="form-label text-color-danger text-3">
                        {errorMessage.passwordErr}{" "}
                        <span className="text-color-danger">*</span>
                      </label>
                    ) : (
                      <label className="form-label text-color-dark text-3">
                        Password <span className="text-color-danger">*</span>
                      </label>
                    )}
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      className="form-control form-control-lg text-4"
                      required
                    />
                  </div>
                </div>
                <div className="row  justify-content-between">
                  <div className="form-group   col-md-auto  ">
                    <div  style={{display:'flex',width:'100%', justifyContent:'flex-start', alignItems:'center', alignContent:'center'}}>
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="rememberme"
                        style={{marginTop:'-.6rem'}}
                      />
                      <label
                        className="form-label custom-control-label cur-pointer text-2  "
                        htmlFor="rememberme"
                        style={{ marginLeft: ".5rem"  }}
                      >
                        Remember Me
                      </label>
                    </div>
                  </div>
                  <div className="form-group col-md-auto">
                    <a
                      className="text-decoration-none text-color-dark text-color-hover-primary font-weight-semibold text-2"
                      href="#"
                    >
                      <Link
                        to={"/user/forget-password"}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        Forgot Password?
                      </Link>
                    </a>
                  </div>
                </div>
                <ReCAPTCHA ref={recpatchaRef} grecaptcha={grecaptchaObject} sitekey={TEST_SITE_KEY}  />

                <div className="row">
                  <div className="form-group col">
                    <button
                      type="submit"
                      className="btn btn-dark btn-modern w-100 text-uppercase rounded-0 font-weight-bold text-3 py-3"
                      data-loading-text="Loading..."
                      disabled={verified}
                      onClick={handleSubmit}
                    >
                      Login
                    </button>
                    {isLoggedIn && (
                      <label className="form-label text-color-danger text-3">
                        {isLoggedIn}{" "}
                        <span className="text-color-danger">*</span>
                      </label>
                    )}
                    <div className="divide">
                      {/* <span className="bg-light px-4 position-absolute left-50pct top-50pct transform3dxy-n50">or</span> */}
                    </div>
                    {/* <a href="#" className="btn btn-primary-scale-2 btn-modern w-100 text-transform-none rounded-0 font-weight-bold align-items-center d-inline-flex justify-content-center text-3 py-3" data-loading-text="Loading..."><i className="fab fa-facebook text-5 me-2" /> Login With Facebook</a> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
