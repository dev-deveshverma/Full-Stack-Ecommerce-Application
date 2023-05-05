import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setUpdatedUser } from "../../Redux/features/loginSlice";
import { updateProfileWithPicture } from "../../service/api";
import ChangePassword from "./UserPreference/ChangePassword";
import MyProfile from "./UserPreference/MyProfile";
import UserAddress from "./UserPreference/UserAddress";
import ListOrder from "../Order/ListOrder";

export default function () {
  //!! state for user's preference selection on profile navigation links
  const [userPreference, setuserPreference] = useState({
    isMyProfileSelected: true,
    isChangePasswordSelected: false,
    isAddressSelected: false,
    isOrdersSelected: false,
  });
  const dispatch = useDispatch();
  //!! state which allow only profile picture update when click on camera icon
  const [isProfileSelected, seIsProfileSelected] = useState(null);
  const { user } = useSelector((store) => store.loginReducer);
  console.log("user", user);
  //!! Profile picture update handler
  const profileUpdateHandler = (profile) => {
    if (profile != null) {
      const formData = new FormData();
      formData.append("profile_pic", isProfileSelected);
      formData.append("user_Id", user.user_Id);
      //!! calling update profile picture api handler
      updateProfileWithPicture(formData)
        .then((res) => {
          console.log("profile update", res.data);
          //!! updating user store state
          dispatch(setUpdatedUser(res.data));
        })
        .catch((err) => {
          console.log("error updating profile", err);
        });
    }
  };

  useEffect(() => {
    profileUpdateHandler(isProfileSelected);
  }, [isProfileSelected]);

  return (
    <div>
      <div role="main" className="main">
        <section className="page-header page-header-modern bg-color-light-scale-1 page-header-lg">
          <div className="container">
            <div className="row">
              <div className="col-md-12 align-self-center p-static order-2 text-center">
                <h1 className="font-weight-bold text-dark">User Profile</h1>
              </div>
              <div className="col-md-12 align-self-center order-1">
                <ul className="breadcrumb d-block text-center">
                  <li>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Home
                    </Link>
                  </li>
                  <li className="active">User</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <div className="container pt-3 pb-2">
          <div className="row pt-2">
            <div className="col-lg-3 mt-4 mt-lg-0">
              <div className="d-flex justify-content-center mb-4">
                <div className="profile-image-outer-container">
                  <div className="profile-image-inner-container bg-color-primary">
                    {user.profile_pic ? (
                      <img
                        src={`${process.env.REACT_APP_BASE_URL}${user.profile_pic}`}
                      />
                    ) : (
                      <img src="" />
                    )}
                    <span className="profile-image-button bg-color-dark">
                      <i className="fas fa-camera text-light" />
                    </span>
                  </div>
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => {
                      seIsProfileSelected(e.target.files[0]);
                    }}
                    className="form-control profile-image-input"
                  />
                </div>
              </div>
              <aside className="sidebar mt-2" id="sidebar">
                <ul className="nav nav-list flex-column mb-5">
                  <li className="nav-item">
                    <a
                      className={`nav-link text-3 ${
                        userPreference.isMyProfileSelected
                          ? "text-dark active"
                          : ""
                      } `}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setuserPreference({
                          isMyProfileSelected: true,
                          isChangePasswordSelected: false,
                          isAddressSelected: false,
                          isOrdersSelected: false,
                        });
                      }}
                    >
                      My Profile
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link text-3 ${
                        userPreference.isChangePasswordSelected
                          ? "text-dark active"
                          : ""
                      } `}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setuserPreference({
                          isMyProfileSelected: false,
                          isChangePasswordSelected: true,
                          isAddressSelected: false,
                          isOrdersSelected: false,
                        });
                      }}
                    >
                      Change Password
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link text-3 ${
                        userPreference.isAddressSelected
                          ? "text-dark active"
                          : ""
                      } `}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setuserPreference({
                          isMyProfileSelected: false,
                          isChangePasswordSelected: false,
                          isAddressSelected: true,
                          isOrdersSelected: false,
                        });
                      }}
                    >
                      Address
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className={`nav-link text-3 ${
                        userPreference.isOrdersSelected
                          ? "text-dark active"
                          : ""
                      } `}
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setuserPreference({
                          isMyProfileSelected: false,
                          isChangePasswordSelected: false,
                          isAddressSelected: false,
                          isOrdersSelected: true,
                        });
                      }}
                    >
                      Orders
                    </a>
                  </li>
                </ul>
              </aside>
            </div>
            {/* //!!user's preference  list  */}
            {userPreference.isMyProfileSelected && <MyProfile user={user} />}
            {userPreference.isChangePasswordSelected && <ChangePassword />}
            {userPreference.isAddressSelected && <UserAddress />}
            {userPreference.isOrdersSelected && <div className="col-lg-9 ">
              <ListOrder/>
              </div>}
          </div>
        </div>
      </div>
    </div>
  );
}
