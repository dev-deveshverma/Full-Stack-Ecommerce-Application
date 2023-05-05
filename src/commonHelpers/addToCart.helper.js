import Swal from "sweetalert2"
import { addItemInCart } from "../Redux/features/cartSlice"
import { addItemIntoCartHandler, updateCartItemHandler } from "../service/api"

export const addToCartHelper= async (product,token,cartData, dispatch,user,toast)=>{

    try {
        //! checking if user is logged in
        if (!token) {
         
          toast.error("Authorization failed!, Please login first" ,{position:'top-center',})
          return
        }
        //! checking if user is already added current item into cart
         if(cartData.filter(item=>item.productId === product.productId).length){
            
            //  toast.warning("Item is already in  the cart" ,{position:'top-center'})
             return
         }
        const newItem = {
          userId: user.user_Id ||'',
          productId: product.productId ||'',
          productName: product.productName ||'',
          productPrice: product.productPrice||'',
          productDiscountPrice: product.productDiscontPrice || '',
          productQuantity: product.productQuantity || 1,
          productImage: product.productImages[0]?.filename || '',
  
        }
        // console.log('new items', newItem)
        const res = await addItemIntoCartHandler(newItem, token);
        //alert("item added to cart")
        //  toast.success(`${product.productName} is  added in the cart successfully` ,{position:'top-left',})
         dispatch(addItemInCart(res.data))
        // console.log('new item created', res)
      } catch (error) {
        console.log('error', error)
      }
}

