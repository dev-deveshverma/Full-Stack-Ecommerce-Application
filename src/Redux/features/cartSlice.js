import {createSlice} from '@reduxjs/toolkit';

const initialState ={
    cartData:[],
    totalPrice:0,
    totalDiscountedPrice:0,
    favouriteList:[],
}
const calculatePrice=(items)=>{
         
   return   items.reduce((acc,cur)=>(acc+(cur.productPrice*cur.productQuantity)),0)
}
const calculateDiscountPrice=(items)=>{
         
   return   items.reduce((acc,cur)=>(acc+(cur.productDiscountPrice*cur.productQuantity)),0)
}


export const cartSlice= createSlice({
     name:'cart',
     initialState,
     reducers:{
        addItemInCart:(state,action)=>{
         //! checking duplicate item in cart
         if(state.cartData.filter(cartItem=>cartItem.productId===action.payload?.productId).length){
            return
         }
         state.cartData.push(action.payload)
         state.totalPrice = calculatePrice(state.cartData);
         state.totalDiscountedPrice = calculateDiscountPrice(state.cartData) 
        },
        incrementItemQuantity:(state,action)=>{
         state.cartData= state.cartData.filter( cartItem=> cartItem.productId===action.payload?cartItem.productQuantity++:cartItem)
         state.totalPrice = calculatePrice(state.cartData);
         state.totalDiscountedPrice = calculateDiscountPrice(state.cartData) 

        },
        decrementItemQuantity:(state,action)=>{
         state.cartData=state.cartData.filter( cartItem=> cartItem.productId===action.payload && cartItem.productQuantity>1?cartItem.productQuantity--:cartItem)
         state.totalPrice = calculatePrice(state.cartData);
         state.totalDiscountedPrice = calculateDiscountPrice(state.cartData) 
        },
        deleteCartItem:(state,action)=>{
          state.cartData= state.cartData.filter((item)=>item.productId!==action.payload)
          state.totalPrice = calculatePrice(state.cartData);
          state.totalDiscountedPrice = calculateDiscountPrice(state.cartData) 
        },
        addFavouriteItem:(state,action)=>{
         //! checking duplicate item in cart
         if(state.favouriteList.filter(cartItem=>cartItem.productId===action.payload?.productId).length){
            return
         }
         state.favouriteList.push(action.payload);
        },
        updateFavouriteItemList:(state,action)=>{},
        deleteFavouriteItem:(state,action)=>{
         state.favouriteList=state.favouriteList.filter((item)=>item.productId!==action.payload)
        },
        emptyCart:(state,action)=>{
         state.cartData=[]
        }
      
     }
})

export const {addItemInCart,addFavouriteItem,decrementItemQuantity,deleteFavouriteItem,incrementItemQuantity,updateFavouriteItemList,deleteCartItem,emptyCart}= cartSlice.actions
export default cartSlice.reducer