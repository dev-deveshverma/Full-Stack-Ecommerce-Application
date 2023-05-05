const {DataTypes} = require('sequelize');
const db= require('../configs/db');
//! order payment model 
const OrderPayment= db.define('OrderPayment',{
    paymentId:{type:DataTypes.INTEGER, allowNull:false, primaryKey:true ,autoIncrement:true},
    stripePayment:{type:DataTypes.JSON, allowNull:false},
    orderId:{type:DataTypes.INTEGER, allowNull:false}
})

module.exports= OrderPayment;