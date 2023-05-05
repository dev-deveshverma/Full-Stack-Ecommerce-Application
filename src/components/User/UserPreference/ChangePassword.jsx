import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { logout } from "../../../Redux/features/loginSlice";
import { changePasswordRequestHandler } from "../../../service/api";
import { PASSWORD_PATTERN } from "../../Auth/Register";
export default function ChangePassword() {
  const {token,user}= useSelector(store=>store.loginReducer)
  const [updatePasswordInput, setUpdatePasswordInput] = useState({
    email:user.email,
    user_Id:user.user_Id,
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  //** password change confirmation state */
  const [isIsPasswordChanged,setIsPasswordChanged] = useState(null)
  //! validation error state 
 const [errorMessage,setErrorMessage]=useState({
  confirmPasswordErr:'',
  passwordErr:'',
  oldPasswordErr:'',
 })
//! login api error state 
const [apiResponseMsg,setapiResponseMsg] = useState(null)
  const dispatch= useDispatch()
  const passwordHandler = (e) => {
    const { name, value } = e.target;
    //*** reseting error messages */
    setErrorMessage({
      oldPasswordErr:'',
      confirmPasswordErr:'',
      passwordErr:""
    })
    setUpdatePasswordInput({ ...updatePasswordInput, [name]: value });
  };

  const updatePassword = () => {
    //! validation check
     if( updatePasswordInput.oldPassword==="" || updatePasswordInput.newPassword==="" || updatePasswordInput.confirmNewPassword===""){
      setErrorMessage({
        oldPasswordErr:'Old password is required',
        confirmPasswordErr:'Confirm password is required',
        passwordErr:"New password is required"
      })
      return 
     }
    if (!PASSWORD_PATTERN.test(updatePasswordInput.oldPassword)) {
      setErrorMessage({oldPasswordErr:'Password  is invalid ',passwordErr:'',confirmPasswordErr:''})
      return;
    }
    if (!PASSWORD_PATTERN.test(updatePasswordInput.newPassword)) {
      setErrorMessage({passwordErr:'Password  is invalid ',confirmPasswordErr:'',oldPasswordErr:''})
      return;
    }
    if (
      updatePasswordInput.confirmNewPassword !== updatePasswordInput.newPassword
    ) {
      setErrorMessage({passwordErr:'',confirmPasswordErr:'Confirm password did not match',oldPasswordErr:''})
      return;
    }
    //! calling api to change password 
    changePasswordRequestHandler(updatePasswordInput,token).then((res)=>{
      console.log('password changed',res.data)
       setIsPasswordChanged("Your password has been changed");
       setapiResponseMsg(null)
      // toast.success("Password changed successfully",{position:'top-center'});
       setTimeout(()=>{
        dispatch(logout());
       },500)
      
    }).catch((err)=>{
      const errorMsg= err.response?.data
      console.log('error',errorMsg.message);
      setIsPasswordChanged(null)
      setapiResponseMsg(errorMsg.message)
      //toast.error(errorMessage.message,{position:'top-center'})
    })
  };
  return (
    <>
      <div className="col-lg-9">
        <form role="form" className="needs-validation">
          <div className="form-group row">
           {
            errorMessage.oldPasswordErr? <label className="col-lg-3 text-color-danger col-form-label form-control-label line-height-9 pt-2 text-2 required">
            {errorMessage.oldPasswordErr}
          </label>: <label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
              Old Password
            </label>
           }
            <div className="col-lg-9">
            
              <input
                className={`form-control text-3 h-auto py-2 ${errorMessage.oldPasswordErr?"border-danger":''}`}
                type="password"
                name="oldPassword"
                onChange={passwordHandler}
                value={updatePasswordInput.oldPassword}
                placeholder=" old password"
                required
              />
            </div>
          </div>
          <div className="form-group row">
          {
            errorMessage.passwordErr? <label className="col-lg-3 text-color-danger col-form-label form-control-label line-height-9 pt-2 text-2 required">
            {errorMessage.passwordErr}
          </label>: <label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
              New Password
            </label>
           }
            <div className="col-lg-9">
              <input
             className={`form-control text-3 h-auto py-2 ${errorMessage.passwordErr?"border-danger":''}`}
                type="password"
                name="newPassword"
                placeholder=" new password"
                onChange={passwordHandler}
                value={updatePasswordInput.newPassword}
                required
              />
            </div>
          </div>
          <div className="form-group row">
          {
            errorMessage.confirmPasswordErr? <label className="col-lg-3 text-color-danger col-form-label form-control-label line-height-9 pt-2 text-2 required">
            {errorMessage.confirmPasswordErr}
          </label>: <label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
              Confirm New Password
            </label>
           }
            <div className="col-lg-9">
              <input
               className={`form-control text-3 h-auto py-2 ${errorMessage.confirmPasswordErr?"border-danger":''}`}
                type="password"
                name="confirmNewPassword"
                placeholder="confirm new password"
                onChange={passwordHandler}
                value={updatePasswordInput.confirmNewPassword}
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="form-group col-lg-9">

              { apiResponseMsg && <label className="col text-color-danger col-form-label form-control-label line-height-9 pt-2 text-2 required">
            {apiResponseMsg}
          </label>}
              {isIsPasswordChanged && <label className="col text-color-success col-form-label form-control-label line-height-9 pt-2 text-2 required">
            {isIsPasswordChanged}
          </label>}
            </div>
            <div className="form-group col-lg-3">
              <input
                type="submit"
                value={"Submit"}
                className="btn btn-primary btn-modern float-end"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                updatePassword() // calling handler
                }}
              />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
