const express = require("express");
const {Op}= require('sequelize')
const router = express.Router();
const Address = require("../model/address.model");
const User = require("../model/user.model");
const authenticate= require('../middleware/authenticate');
const authorization= require('../middleware/authorization')


const path=require('path');
const EventEmmiter=require("events");
const {emit}=require('process');
const { orderPlaced } = require("../utils/utils");
const eventEmmiter= new EventEmmiter();

//  //** relationship start one to one */

//  Address.belongsTo(User, {foreignKey:'userId'})
//  User.hasOne(Address,{foreignKey:'userId'});

//  // ** relationship end one to one */

//! one to many relationship between User and Address start
Address.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Address, { foreignKey: "userId" });
//! one to many relationship between User and Address end
// get all address  route
router.get("", async (req, res) => {
  try {
    const addresses = await Address.findAll({ include: User });
    return res.status(200).send(addresses);
  } catch (error) {
    return res.status(500).send(error);
  }
});

// create new address route
router.post("",authenticate(),authorization(["user"]), async (req, res) => {
  try {
    const address = await Address.create(req.body);
     if(address){
      const alladdress= await Address.findAll({where:{userId:req.body.userId}});
    
     
      return res.status(200).send(alladdress);
     }
     return res.status(400).send({message:"Something went wrong"})
  } catch (error) {
    return res.status(500).send(error);
  }
});
// update address route by logged user 
router.patch("",authenticate(),authorization(["user"]), async (req, res) => {
  try {
      const updatedAddress = await Address.update(req.body,{where:{[Op.and]:[{addressId:req.body.addressId},{userId:req.body.userId}]}});
      if(updatedAddress[0]===1){
        const alladdress= await Address.findAll({where:{userId:req.body.userId}});
        return res.status(200).send(alladdress);
      }
      return res.status(404).send({message: "Address not found"});
  } catch (error) {
    return res.status(500).send(error);
  }
})
// // delete address route by logged user
// router.delete("",authenticate(),authorization(["user"]), async (req, res) => {
//   try {
//     const deletedAddress = await Address.destroy({where:{[Op.and]:[{addressId:req.body.addressId},{userId:req.body.userId}]}});
//     // console.log('delete confirmation ' , deletedAddress)
//     if(deletedAddress===1){
//       const alladdress= await Address.findAll({where:{userId:req.body.userId}});
//       return res.status(200).send(alladdress);
//     }
//     return res.status(404).send({message: "Address not found"});
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// })

module.exports = router;
