import {createAsyncThunk,createSlice} from '@reduxjs/toolkit' 
import { loginApiHanlder } from '../../service/api';

const initialState={
    error:false,
    user:{},
    token:'',
    cart:[],

}

// function to make login request 
 export const fetchUser= createAsyncThunk('login/fetchUser', (user)=>{
        return  loginApiHanlder(user).then((res)=>res.data)
});

// loginSlice 
const loginSlice =createSlice({
    name:"login",
    initialState,
     reducers:{
        loginSuccess:(state,action)=>{
        
           state.error = false
           state.user= action.payload?.user
           state.token=action.payload.token
           state.cart= action.payload.cartData
           
           
        },
        loginError:(state,action)=>{
        
           state.error = true
           state.user= {}
           state.token=''
           state.cart= []
  
        },
        logout:(state,action)=>{
          state.error = false
          state.user={}
          state.token=''
          
          
        
        },
        setUpdatedUser:(state,action)=>{
          state.user = action.payload
        },
      
     }
})
export const {loginSuccess , loginError ,logout , setUpdatedUser,setUpdatedAddress}= loginSlice.actions
export default loginSlice.reducer