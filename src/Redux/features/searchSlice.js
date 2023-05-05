import { createSlice } from "@reduxjs/toolkit";

const initialState={
    searchResults:[]
}


const searchSlice= createSlice({
    name:"searchSlice",
    initialState,
     reducers:{
        addSearchResult:(state,action)=>{
          state.searchResults= action.payload
        }
     }
})

export const {addSearchResult}= searchSlice.actions
export default searchSlice.reducer