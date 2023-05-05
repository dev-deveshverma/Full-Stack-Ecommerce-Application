import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function ListOrder() {
  function extractOrderedItems(orders) {
    let result = [];
    for (let order = 0; order < orders.length; order++) {
      const orderItemArray = orders[order]?.orderedItems
      for (let item = 0; item < orderItemArray.length; item++) {
        let orderObj = {
          'orderId': orders[order].orderId,
          ...orderItemArray[item]
        }
        result.push(orderObj)
      }
    }
    console.log('extractOrderedItems', result)
    return result
  }
  
    const [myOrder, setMyOrders] = useState([]);
    const { user } = useSelector((store) => store.loginReducer);
  
    useEffect(() => {
      axios.get(`${process.env.REACT_APP_API_URL}/order/${user?.user_Id}`).then((res) => {
        setMyOrders(res.data)
      }).catch((err) => {
        console.log('error', err)
      })
    }, [])

   console.log("myOrders",myOrder)
   
  return (
    <>
      <div role="main" className="main shop pb-2 border" >
        <div className="container">
          <div className="row pb-4 mb-5">
            <div className="col-lg-12 mb-5 mb-lg-0">
              <form method="post" action>
                <div className="table-responsive">
                  <table className="table table-hover">
                  <caption>List of orders</caption>

                    <thead>
                      <tr>
                        <th scope="col"># Order Id</th>
                        <th scope="col">Order Price</th>
                        <th scope="col">Order Date</th>
                        <th scope="col">Order Status </th>
                        <th scope="col">More Details </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        myOrder?.map((el)=>
                        <tr>
                        <th >{el.orderId}</th>
                        <td> ₹ {el.orderAmount}</td>
                        <td>
                      <span>
                     
                      {moment(el?.orderDate).format('lll')}
                      </span>
                        </td>
                        <td>Ready Shipping</td>
                        <td><Link to={`/user/order/order-details/${el.orderId}`}>View</Link></td>
                       </tr>
                         
                        )
                        }
                       
                     
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
