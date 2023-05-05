const express = require("express");
const router = express.Router();
const OrderDetail = require("../model/orderDetail.model");
const Order = require("../model/order.model");
//! one to one relationship between Order and OrderDetail start
OrderDetail.belongsTo(Order, { foreignKey: "orderId" });
Order.hasOne(OrderDetail, { foreignKey: "orderId" });

//! one to one relationship between Order and OrderDetail end

router.get("", async (req, res) => {
  try {
    const allOrdersDetails = await OrderDetail.findAll({ include: Order });
    return res.status(200).send(allOrdersDetails);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// // create new order details
// router.post("", async (req,res)=>{
//     try {
//         const newOrderDetails= await OrderDetail.create(req.body);
//         return res.status(201).send(newOrderDetails);

//     } catch (error) {
//         return res.status(500).send(error)
//     }
// })

module.exports = router;
