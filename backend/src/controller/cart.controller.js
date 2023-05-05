const express = require("express");
const router = express.Router();
const Cart = require("../model/cart.model");
const Product= require("../model/product.model");
const authenticate= require("../middleware/authenticate");
const authorization = require("../middleware/authorization");
const {Op}= require('sequelize')

// get all products
router.get("", async (req, res) => {
  try {
    const allproducts = await Cart.findAll();
    return res.status(200).send(allproducts);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// get all products of single user by user id
router.get("/:userId", authenticate(),authorization(["user"]), async (req, res) => {
  try {
    const allproducts = await Cart.findAll({
      where: { userId: req.params.userId },
    });
    return res.status(200).send(allproducts);
  } catch (error) {
    return res.status(400).send(error);
  }
});

// create new cart product
router.post("",authenticate(),authorization(["user"]),  async (req, res) => {
  try {
    const item = await Cart.create(req.body);
    const cartData= await Cart.findAll({where:{userId:req.body.userId}});
    return res.status(201).send(cartData);
  } catch (error) {
    return res.status(400).send(error);
  }
});

//? update quantity of single product by item id
router.patch("",authenticate(),authorization(["user"]), async (req, res) => {
  try {
      //! check if product is quantity available 
       const currentProduct= await Product.findOne({where:{
          productId:req.body.productId }}
       );
       if(currentProduct.productStockQuantity<req.body.productQuantity){
        return res.status(400).send({message:"Product is not available"})
       }
       const updatedItem = await Cart.update(
      { productQuantity: req.body.productQuantity },
      { where: {[Op.and]:[{cartId: req.body.cartId},{userId:req.body.userId}] } }
       );
     if(updatedItem[0]===1){
      const updatedProducts= await Cart.findAll({where:{userId:req.body.userId}});
       return res.status(200).send(updatedProducts)

    }
    return res.status(404).send({message:"Product not found"});
  } catch (error) {
    return res.status(400).json(error);
  }
});
//? delete  single product by itemid
router.delete("",authenticate(),authorization(["user"]), async (req, res) => {
  try {
    const deletedItem = await Cart.destroy({
      where: {[Op.and]:[{cartId: req.body.cartId},{userId:req.body.userId}] },
    });
    if(deletedItem===1){
      const allproducts= await Cart.findAll({where:{userId:req.body.userId}});
      return res.status(200).send(allproducts)
    }
    return res.status(404).json({message:"No item found"});
  } catch (error) {
    return res.status(400).send(error);
  }
});

//! delete quantity of all items of user's cart
router.delete("/allUserItem/:userId",authenticate(),authorization(["user"]), async (req, res) => {
  try {
    const updatedItem = await Cart.destroy({
      where: { userId: req.params.userId },
    });
    return res.status(201).json(updatedItem);
  } catch (error) {
    return res.status(400).send(error);
  }
});

module.exports = router;
