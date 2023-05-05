import { addItemInCart } from "../Redux/features/cartSlice"

export const addToCartByReduxHelper=(product,dispatch)=>{
    //** create new cart item obj */
    const newItem = {
        productId: product.productId ||'',
        productName: product.productName ||'',
        productPrice: product.productPrice||'',
        productDiscountPrice: product.productDiscontPrice || '',
        productQuantity: product.productQuantity || 1,
        productImage: product.productImages[0]?.filename || '',

      }
      //** update cart redux store  */
      dispatch(addItemInCart(newItem))
}