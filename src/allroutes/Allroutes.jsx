import { Route, Routes } from "react-router-dom";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import Cart from "../components/Cart/Cart";
import Checkout from "../components/Checkout/Checkout";
import FevorateList from "../components/fevorate/FevorateList";
import Home from "../components/home/Home";
import Searched from "../components/navbar/Searched";
import ListOrder from "../components/Order/ListOrder";
import Ordercomplete from "../components/Order/Ordercomplete";
import SingleOrderDetails from "../components/Order/SingleOrderDetails";
import Page404 from "../components/PageNotFound/Page404";
import SingleProductDetails from "../components/product/SingleProductDetails";
import UserProfile from "../components/User/UserProfile";
import ForgetPassword from "../components/User/userRequest/ForgetPassword";
import SendForgetPasswordRequest from "../components/User/userRequest/SendForgetPasswordRequest";
import ProtectedRoutes from "./ProtectedRoutes";
export const Allroutes = () => {
  return (
    <>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path= '/user/allOrders' element={<ListOrder/>}/>
          <Route path ={"/payment/success/:id"} element={<Ordercomplete/>}/>
          <Route path ='/user/order/order-details/:orderId' element={<SingleOrderDetails/>}/>
          <Route path={"/userprofile"} element={<UserProfile/>}/>
        </Route>
        <Route path="/" element={<Home/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path={`/:category/:title/:id`} element={<SingleProductDetails/>}/>
        <Route path= {"/cart"} element={<Cart/>}/>
        <Route path ={"/checkout"} element={<Checkout/>}/>
       
        <Route path='/user/forget-password' element={<SendForgetPasswordRequest/>}/>
        <Route path ='/user/forgotPassword/update/:token' element={<ForgetPassword/>}/>
        <Route path ="/searched" element={<Searched/>}/>
        <Route path='/user/fevorate' element={<FevorateList/>}/>
        <Route path="*" element={<Page404/>}/>
      </Routes>
    </>
  );
};

