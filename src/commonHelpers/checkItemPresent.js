import { useSelector } from "react-redux";

export const isItemPresentInCart=(productId,cartData)=>{
     return cartData.filter(cartItem=>cartItem.productId === productId)
}
export const isItemPresentInFavoruiteList=(productId,favouriteList)=>{
    return favouriteList.filter(favItem=>favItem.productId === productId)
}