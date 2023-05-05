import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {getallproductsHandler} from '../../service/api'
const initialState={
    page:null,
    error:false,
    product:[],
    singleProduct:{}
}

export const fetchAllProductData =createAsyncThunk('product/fetchAllProductData',(page)=>{
    return getallproductsHandler(page).then((res)=>(res.data))
});

export const allProductSlice=createSlice({
    name:'product',
    initialState,
    reducers:{
        addSingleProduct:(state,action)=>{
            state.singleProduct=action.payload
        },
        updateProduct:(state,action)=>{
            state.product=action.payload
        },
        updateProductpage:(state,action)=>{
            // state.page=action.payload
        },
        setPageCount:(state,action)=>{
            state.page=action.payload
        }
    },

    extraReducers:(builder)=>{
        builder.addCase(fetchAllProductData.pending,state=>{})
        builder.addCase(fetchAllProductData.fulfilled, (state ,action)=>{
             state.product=action.payload
             state.error=false
        })
        builder.addCase(fetchAllProductData.rejected, (state,action)=>{
            state.product=[]
            state.error=action.error?.message
           
        })
     }
})
export const {addSingleProduct,updateProduct,setPageCount}= allProductSlice.actions
export default allProductSlice.reducer