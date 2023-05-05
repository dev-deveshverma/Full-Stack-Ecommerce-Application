const {DataTypes}= require('sequelize');
const db= require('../configs/db');

//! order model 
const Order= db.define('Order',{
    orderId:{type:DataTypes.INTEGER, allowNull:false, autoIncrement:true, primaryKey:true},
    orderDate:{type:DataTypes.DATE, allowNull:false,},
    orderAmount:{type:DataTypes.INTEGER, allowNull:false},
    orderStatus:{type:DataTypes.BOOLEAN , defaultValue:0},
    userId:{type:DataTypes.INTEGER, allowNull:false},
    shippingAddress:{type:DataTypes.JSON, allowNull:false},
    orderedItems:{type:DataTypes.JSON, allowNull:false}
})

module.exports=Order;