const express = require("express");
const router = express.Router();
const Order = require("../model/order.model");
const Address = require("../model/address.model");
const Cart = require("../model/cart.model");
const { Op } = require("sequelize")

// //! one to one relationship between Order and address start
// Order.belongsTo(Address, { foreignKey: "addressId" });
// Address.hasOne(Order, { foreignKey: "addressId" });

// //! one to one relationship between Order and address end

// all order route

router.get("", async (req, res) => {
  try {
    const allOrders = await Order.findAll({
      order:[["orderId","DESC"]]
    });
    return res.status(200).send(allOrders);
  } catch (error) {
    return res.status(500).send(error);
  }
});

//! get all order of single user 
router.get("/:id", async (req, res) => {
  try {
    const allOrders = await Order.findAll({where:{userId:req.params.id},order:[["orderId","DESC"]],
     });
    return res.status(200).send(allOrders);
  } catch (error) {
    return res.status(500).send(error);
  }
});
//! get singler  order of single user by order id 
router.get("/orderStatus/:id", async (req, res) => {
  try {
    const allOrders = await Order.findOne({where:{orderId:req.params.id},});
    return res.status(200).send(allOrders);
  } catch (error) {
    return res.status(500).send(error);
  }
});

router.post("", async (req, res) => {
  try {
    //!checking duplicate order by  current user 
    const isOrderExist = await Order.findOne({ where: { [Op.and]: [{ userId: req.body.userId }, { orderStatus: 0 }] } });
    //! if user has created an order already then we simply update the order body with letest cart items
    if (isOrderExist) {
      const cartItems = req.body?.cartData
      const updatedPrice = cartItems.reduce((acc, item) => acc + (item.productDiscountPrice * item.productQuantity), 0)
      const updatedOrderStatus = await Order.update({
        orderedItems: cartItems,
        orderAmount: updatedPrice,
        shippingAddress:req.body.shippingAddress,
        orderDate: new Date(),
      }, { where: { orderId: isOrderExist.orderId } });
      //!! fetching letest order status 
      const updatedOrder = await Order.findByPk(isOrderExist.orderId)
      return res.status(200).send(updatedOrder);
    }
    // //! checking if user has add item in cart if true then create new order
    // const allIems = await Cart.findAll({ where: { userId: req.body.userId } });
    const allItems= req.body?.cartData;
    if (allItems.length) {
      const totalPrice = allItems.reduce(
        (acc, item) => acc + item.productDiscountPrice * item.productQuantity,
        0
      );
      const orderObj = {
        ...req.body,
        orderDate: new Date(),
        orderStatus: 0,
        orderAmount: totalPrice,
        orderedItems: allItems,
        shippingAddress: req.body.shippingAddress
      };
      const newOrder = await Order.create(orderObj);

      return res.status(201).send(newOrder);
    }
    return res.status(400).send({ message: "cart is empty" });
  } catch (error) {
    return res.status(500).send(error);
  }
});
module.exports = router;
