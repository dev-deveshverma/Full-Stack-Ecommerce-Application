import axios from "axios"

export const createAccountApi = (user)=>{
    return  axios.post(`${process.env.REACT_APP_API_URL}/register`, user , {headers:{
        "Content-Type": "application/json",
      }}
);
}

export const loginApiHanlder=(user)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/login`, user );
}

export const getallproductsHandler=(page)=>{

    return axios.get(`${process.env.REACT_APP_API_URL}/products?page=${page}&limit=6`)
}

export const forgetPasswordRequestHandler=(user)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/users/register/verify`,user);
}

export const resetPasswordRequestHandler=(user)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/users/register/verify/updatePassword`,user)
}
export const changePasswordRequestHandler=(user,token)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/users/change-password`,user,{
        headers:{
            "Authorization":`Bearer ${token}`
         }
    })
}
//----------------------------------------------------------------
export const getallCategory=()=>{
    return  axios.get(`${process.env.REACT_APP_API_URL}/category`)
}
export const getallProducts=(url)=>{

    return axios.get(`${process.env.REACT_APP_API_URL}/subcategory/${url}`)
}


export const getallProductsBySubCategoryId=(id)=>{

    return axios.get(`${process.env.REACT_APP_API_URL}/subcategory/products/${id}`)
}

export const getsingleProduct=(url)=>{

    return axios.get(`${process.env.REACT_APP_API_URL}/Products/${url}`)
}

export const getsingleOrder=(orderId)=>{

    return axios.get(`${process.env.REACT_APP_API_URL}/order/orderStatus/${orderId}`)
}

export const updateProfileWithPicture=(user)=>{
     return axios.patch(`${process.env.REACT_APP_API_URL}/users/profile` , user ,{headers:{
        "Content-Type": "multipart/form-data"
      }})
}
export const updateProfileWithoutPicture=(user)=>{
    return axios.patch(`${process.env.REACT_APP_API_URL}/users` , user)
}

export const updateAddress=(address,token)=>{
    return axios.patch(`${process.env.REACT_APP_API_URL}/address` , address,
    {
        headers:{
            "Authorization":`Bearer ${token}`
         }
    }
    )
}

export const addnewAddress=(address,token)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/address`,address,
    {
        headers:{
            "Authorization":`Bearer ${token}`
        }
    })
    }
    

export const addItemIntoCartHandler=(cart , token)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/cart`, cart ,{
         headers:{
            "Authorization": `Bearer ${token}`
         }
    })
}
export const getAllCartItemsByUserId=(userId , token)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/cart/${userId}`, {
         headers:{
            "Authorization": `Bearer ${token}`
         }
    })
}
export const updateCartItemHandler=(item, token)=>{
    return axios.patch(`${process.env.REACT_APP_API_URL}/cart`,item, {
        headers:{
           "Authorization": `Bearer ${token}`
        }
   })
}
export const deleteCartItemHandler=(item, token)=>{
    return axios.delete(`${process.env.REACT_APP_API_URL}/cart`, {
        headers:{
           "Authorization": `Bearer ${token}`
        },
        data: item
   })
}

export const deleteAddressItemHandler=(item, token)=>{
    return axios.delete(`${process.env.REACT_APP_API_URL}/address`, {
        headers:{
           "Authorization": `Bearer ${token}`
        },
        data: item
   })
}

export const createOrder=( user,token)=>{
    return axios.post(`${process.env.REACT_APP_API_URL}/order` , user)
}

export const getallProduct=()=>{

    return axios.get(`${process.env.REACT_APP_API_URL}/subcategory`)
}
