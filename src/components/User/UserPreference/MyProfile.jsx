import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setUpdatedUser } from "../../../Redux/features/loginSlice";
import { updateProfileWithoutPicture } from "../../../service/api";
import { EMAIL_PATTERN, STRING_PATTERN } from "../../Auth/Register";
export default function MyProfile({ user }) {
  //!! state which allow to update only alloted fields when edit button is clicked
  const [isEditClicked, seIsEditClicked] = useState({
    isFirstNameDisabled: true,
    isLastNameDisabled: true,
    isSelectGenderDisabled: true,
  });

  const dispatch = useDispatch();
  const { addressData } = useSelector((store) => store.addressReducer);

  //!user update bio state
  const [userInput, setUserInput] = useState({
    user_Id: user.user_Id,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    gender: user.gender || "",
  });
  //! validation error state
  const [errorMessage, setErrorMessage] = useState({
    firstNameErr: "",
    lastNameErr: "",
    genderErr: "",
  });
  //! login api error state
  const [apiResponseMsg, setapiResponseMsg] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    //*** reseting error states */
    setErrorMessage({
      firstNameErr: "",
    lastNameErr: "",
    genderErr: "",
    })
    setUserInput({ ...userInput, [name]: value });
  };
  console.log("user input: ", userInput);
  const updateProfileInfo = () => {
    //! validation check
    if (!STRING_PATTERN.test(userInput.firstName)) {
      setErrorMessage({
        firstNameErr: "Invalid letters",
        lastNameErr: "",
        genderErr: "",
      });
      return false;
    }

    if (!STRING_PATTERN.test(userInput.lastName)) {
      setErrorMessage({
        firstNameErr: "",
        lastNameErr: "Invalid letters",
        genderErr: "",
      });
      return false;
    }
    if (!STRING_PATTERN.test(userInput.gender)) {
      setErrorMessage({
        firstNameErr: "",
        lastNameErr: "",
        genderErr: "Please select a gender",
      });
      return false;
    }
    //! calling api to update user information
    updateProfileWithoutPicture(userInput)
      .then((res) => {
        console.log("user information updated", res.data);
        dispatch(setUpdatedUser(res.data));
      })
      .catch((err) => {
        const errorMsg = err.response?.data;
        console.log("error", errorMsg.message);
        setapiResponseMsg(errorMsg.message);
      });
      return true
  };
  return (
    <>
      <div className="col-lg-9">
        <form role="form" className="needs-validation">
          <div className="form-group row">
            {
              errorMessage.firstNameErr?<label className="col-lg-3 text-color-danger col-form-label form-control-label line-height-9 pt-2 text-2 required">
             {errorMessage.firstNameErr}
            </label>:<label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
              First name
            </label>
            }
            <div className="col-lg-9">
              <input
               className={`form-control text-3 h-auto py-2 ${errorMessage.firstNameErr?"border-danger":''}`}
                type="text"
                name="firstName"
                placeholder="i.e jhon"
                value={userInput.firstName}
                onChange={handleChange}
                disabled={isEditClicked.isFirstNameDisabled && true}
                required
              />
            </div>
          </div>
          <div className="form-group row">
           
         { errorMessage.lastNameErr?<label className="col-lg-3 text-color-danger col-form-label form-control-label line-height-9 pt-2 text-2 required">
             {errorMessage.lastNameErr}
            </label>:<label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
              Last name
            </label>
            }
            <div className="col-lg-9">
              <input
               className={`form-control text-3 h-auto py-2 ${errorMessage.lastNameErr?"border-danger":''}`}
                type="text"
                name="lastName"
                value={userInput.lastName}
                onChange={handleChange}
                placeholder="i.e smith"
                disabled={isEditClicked.isLastNameDisabled && true}
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
              Email
            </label>
            <div className="col-lg-9">
              <input
                className="form-control text-3 h-auto py-2"
                type="email"
                name="email"
                placeholder="i.e jhon@gmail.com"
                value={user.email}
                readOnly
                required
              />
            </div>
          </div>
          {/* <div className="form-group row">
                  <label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2">
                    Company
                  </label>
                  <div className="col-lg-9">
                    <input
                      className="form-control text-3 h-auto py-2"
                      type="text"
                      name="company"
                                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2">
                    Website
                  </label>
                  <div className="col-lg-9">
                    <input
                      className="form-control text-3 h-auto py-2"
                      type="url"
                      name="website"
                                    />
                  </div>
                </div> */}
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2">
              Address
            </label>
            <div className="col-lg-9">
              <input
                className="form-control text-3 h-auto py-2"
                type="text"
                name="address"
                placeholder="Street"
                value={addressData[0]?.currentAddress}
                readOnly
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2" />
            <div className="col-lg-6">
              <input
                className="form-control text-3 h-auto py-2"
                type="text"
                name="city"
                placeholder="City"
                value={addressData[0]?.city}
                readOnly
              />
            </div>
            <div className="col-lg-3">
              <input
                className="form-control text-3 h-auto py-2"
                type="text"
                name="state"
                placeholder="State"
                value={addressData[0]?.state}
                readOnly
              />
            </div>
          </div>
          <div className="form-group row">
          {
              errorMessage.genderErr?<label className="col-lg-3 text-color-danger col-form-label form-control-label line-height-9 pt-2 text-2 required">
             {errorMessage.genderErr}
            </label>:<label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
              Gender
            </label>
            }
            <div className="col-lg-9">
              <div className="custom-select-1">
                <select
                  id="user_time_zone"
                  className={`form-control text-3 h-auto py-2 ${errorMessage.genderErr?"border-danger":''}`}
                  name="gender"
                  value={userInput.gender}
                  onChange={handleChange}
                  size={0}
                  disabled={isEditClicked.isSelectGenderDisabled && true}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
              Username
            </label>
            <div className="col-lg-9">
              <input
                className="form-control text-3 h-auto py-2"
                type="text"
                name="username"
                value={user.email}
                placeholder="i.e jhon@gmail.com"
                readOnly
                required
              />
            </div>
          </div>
          {/* <div className="form-group row">
                  <label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
                    Password
                  </label>
                  <div className="col-lg-9">
                    <input
                      className="form-control text-3 h-auto py-2"
                      type="password"
                      name="password"
                      required
                    />
                  </div>
                </div> */}
          {/* <div className="form-group row">
                  <label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
                    Confirm password
                  </label>
                  <div className="col-lg-9">
                    <input
                      className="form-control text-3 h-auto py-2"
                      type="password"
                      name="confirmPassword"
                                      required
                    />
                  </div>
                </div> */}
          <div className="form-group row">
            <div className="form-group col-lg-9">
              {apiResponseMsg && (
                <label className="col text-color-danger col-form-label form-control-label line-height-9 pt-2 text-2 required">
                  {apiResponseMsg}
                </label>
              )}
              {!isEditClicked.isFirstNameDisabled && (
                <input
                  type="submit"
                  value={"Update Profile"}
                  className="btn mr-2 btn-success btn-modern float-end"
                  data-loading-text="Loading..."
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                   if(  updateProfileInfo()) {
                     seIsEditClicked({
                       isFirstNameDisabled: true,
                       isLastNameDisabled: true,
                       isSelectGenderDisabled: true,
                     });
                   }}

                   }
                />
              )}
            </div>
            <div className="form-group col-lg-3">
              {isEditClicked.isFirstNameDisabled ? (
                <input
                  type="submit"
                  value={"Edit Profile"}
                  className="btn btn-primary btn-modern float-end"
                  onClick={(e) => {
                    e.preventDefault();

                    seIsEditClicked({
                      isFirstNameDisabled: false,
                      isLastNameDisabled: false,
                      isSelectGenderDisabled: false,
                    });
                  }}
                />
              ) : (
                <input
                  type="submit"
                  value={"Cancel"}
                  className="btn btn-danger btn-modern float-end"
                  onClick={(e) => {
                    e.preventDefault();
                    seIsEditClicked({
                      isFirstNameDisabled: true,
                      isLastNameDisabled: true,
                      isSelectGenderDisabled: true,
                    });
                    setUserInput({ ...user });
                  }}
                />
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
