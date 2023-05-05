import { createSlice } from "@reduxjs/toolkit";

const initialState={
    orderData:[],
    singleOrder:{}
}

export const orderSlice=createSlice({
    name:'orders',
    initialState,
    reducers:{
        addNewOrder:(state,action)=>{
            state.orderData=action.payload;
        },
        addSingleOrder:(state,action)=>{
            state.singleOrder=action.payload;
        }
    }
})


export const {addNewOrder, addSingleOrder}=orderSlice.actions
export default orderSlice.reducer