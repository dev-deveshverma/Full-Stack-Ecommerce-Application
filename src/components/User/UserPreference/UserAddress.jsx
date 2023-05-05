import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addNewAddress, setNewAddress } from '../../../Redux/features/addressSlice';
import { addnewAddress, updateAddress } from '../../../service/api';
import { STRING_PATTERN } from '../../Auth/Register';
import { ADDRESS_PATTERN } from '../../Checkout/Checkout';
const validationChecker=({currentAddress,city,state},setErrorMessage)=>{
   //validation check
   if(!ADDRESS_PATTERN.test(currentAddress)){
    setErrorMessage({
      addressErr:"Address is invalid",
      cityErr:'',
      stateErr:''
    })
    return 
  }
  if(!STRING_PATTERN.test(city)){
    setErrorMessage({
      addressErr:"",
      cityErr:'City name is invalid',
      stateErr:''
    })
    return 
  }
  if(!STRING_PATTERN.test(state)){
    setErrorMessage({
      addressErr:"",
      cityErr:'',
      stateErr:'State name is invalid'
    })
    return 
  }
 return true
}

export default function UserAddress() {
  const {token,user}= useSelector(store=>store.loginReducer);
  const {addressData}= useSelector(store=>store.addressReducer)
  const dispatch=useDispatch()
  //! new address input
  const [addressInput,setAddressInput]=useState({
    userId:user.user_Id,
    currentAddress: addressData[0]?.currentAddress ||'',
    city:addressData[0]?.city ||'',
    state:addressData[0]?.state ||''
  });
  //! validation error state
  const [errorMessage, setErrorMessage] = useState({
    addressErr: "",
    cityErr: "",
    stateErr: "",
  });
  const [isEditSelected,setIsEditSelected]=useState(false)
  const addressInputHandler= (e)=>{
    const {name,value}=e.target;
    setErrorMessage({
      addressErr: "",
      cityErr: "",
      stateErr: "",
    })
    setAddressInput({...addressInput, [name]:value})
  }
  //! create new address function 
 const createNewAddressHandler=()=>{
   //*** vaidation check*/
   if(!ADDRESS_PATTERN.test(addressInput.currentAddress)){
    setErrorMessage({
      addressErr:"Address is invalid",
      cityErr:'',
      stateErr:''
    })
    return 
  }
  if(!STRING_PATTERN.test(addressInput.city)){
    setErrorMessage({
      addressErr:"",
      cityErr:'City name is invalid',
      stateErr:''
    })
    return 
  }
  if(!STRING_PATTERN.test(addressInput.state)){
    setErrorMessage({
      addressErr:"",
      cityErr:'',
      stateErr:'State name is invalid'
    })
    return 
  }
    //! calling api to create a new address
     addnewAddress(addressInput, token).then((res)=>{
      console.log('Address created',res.data);
      toast.success('New address created!');
      dispatch(setNewAddress(res.data))
     }).catch((err)=>{
      console.log(err)
     })
 }

 //? update existing address 
 const updateExistingAddress=()=>{
  if(!ADDRESS_PATTERN.test(addressInput.currentAddress)){
    setErrorMessage({
      addressErr:"Address is invalid",
      cityErr:'',
      stateErr:''
    })
    return 
  }
  if(!STRING_PATTERN.test(addressInput.city)){
    setErrorMessage({
      addressErr:"",
      cityErr:'City name is invalid',
      stateErr:''
    })
    return 
  }
  if(!STRING_PATTERN.test(addressInput.state)){
    setErrorMessage({
      addressErr:"",
      cityErr:'',
      stateErr:'State name is invalid'
    })
    return 
  }
  updateAddress({...addressInput, addressId:addressData[0]?.addressId,userId:user.user_Id},token).then((res)=>{
    console.log('updated address',res.data);
    
    dispatch(setNewAddress(res.data))
    setIsEditSelected(false)
  }).catch((err)=>{
    console.log('error updating address',err)
  })
 
 }
  return (
    <>
      <div className="col-lg-9">
        <form role="form" className="needs-validation">
          <div className="form-group row">
          {
              errorMessage.addressErr?<label className="col-lg-3 text-color-danger col-form-label form-control-label line-height-9 pt-2 text-2 required">
             {errorMessage.addressErr}
            </label>:<label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
              Current Address
            </label>
            }
            <div className="col-lg-9">
              <input
                  className={`form-control text-3 h-auto py-2 ${errorMessage.addressErr?"border-danger":''}`}
                type="text"
                name="currentAddress"
                onChange={addressInputHandler}
                value={addressInput.currentAddress}
                disabled={(!isEditSelected && addressData.length) && true}
                placeholder="example B block house no 15C ... "
                required
              />
            </div>
          </div>
          <div className="form-group row">
          {
              errorMessage.cityErr?<label className="col-lg-3 text-color-danger col-form-label form-control-label line-height-9 pt-2 text-2 required">
             {errorMessage.cityErr}
            </label>:<label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
              City name
            </label>
            }
            <div className="col-lg-9">
            <input
                 className={`form-control text-3 h-auto py-2 ${errorMessage.cityErr?"border-danger":''}`}
                type="text"
                name="city"
                onChange={addressInputHandler}
                disabled={(!isEditSelected && addressData.length) && true}
                value={addressInput.city}
                placeholder="example allahabad , Banaras ..."
                required
              />
            </div>
          </div>
          <div className="form-group row">
          {
              errorMessage.stateErr?<label className="col-lg-3 text-color-danger col-form-label form-control-label line-height-9 pt-2 text-2 required">
             {errorMessage.stateErr}
            </label>:<label className="col-lg-3 col-form-label form-control-label line-height-9 pt-2 text-2 required">
             State
            </label>
            }
            <div className="col-lg-9">
            <input
                  className={`form-control text-3 h-auto py-2 ${errorMessage.stateErr?"border-danger":''}`}
                type="text"
                name="state"
                disabled={(!isEditSelected && addressData.length) && true}
                onChange={addressInputHandler}
                value={addressInput.state}
                placeholder="example Uttar Pradesh, Punjab ....."
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <div className="form-group col-lg-9">
            {!isEditSelected && <input
                type="submit"
                value={"Edit Address"}
                className="btn btn-success btn-modern float-end"
                disabled={addressData.length===0 && true}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIsEditSelected(true)
                }}
              />}
              

          {isEditSelected &&   <input
                type="submit"
                value={"Update Address"}
                className="btn btn-success btn-modern float-end"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                 updateExistingAddress()
                }}
              />}
            </div>
            <div className="form-group col-lg-3">
            
            {!addressData.length &&   <input
            type="submit"
            value={"Submit"}
            className="btn btn-primary btn-modern float-end"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              createNewAddressHandler();
            }}
          />}

          {isEditSelected && <input
            type="submit"
            value={"Canel"}
            className="btn btn-danger btn-modern float-end"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const {currentAddress, city,state}= addressData[0]
             setIsEditSelected(false);
             setAddressInput({currentAddress,city,state})
            }}
          />}
            </div>
          </div>
        </form>
      </div>
    
    </>
  )
}
