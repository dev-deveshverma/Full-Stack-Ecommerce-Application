import { createSlice } from "@reduxjs/toolkit";
 const initialState={
    addressData:[],
    orderAddress:{}
 }

 export const addressSlice=createSlice({

    name:'address',
    initialState,
    reducers:{
        setNewAddress:(state,action)=>{
            state.addressData=action.payload
            
        },
        addOrderAddress:(state,action)=>{
            state.orderAddress=action.payload
        }
    }
 })

 export const {setNewAddress,addOrderAddress}=addressSlice.actions
 export default addressSlice.reducer