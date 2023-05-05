
import loginReducer from '../Redux/features/loginSlice'
import cartReducer from '../Redux/features/cartSlice'
import getallproductReducer from '../Redux/features/getallproductSlice'
import addressReducer from "../Redux/features/addressSlice"
 import searchReducer from "../Redux/features/searchSlice"
 import orderReducer from "../Redux/features/orderSlice"
export const rootReducer={
      loginReducer,
      cartReducer,
      getallproductReducer,
      addressReducer,
      orderReducer,
      searchReducer

}