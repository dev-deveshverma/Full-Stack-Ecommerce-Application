const {DataTypes} = require('sequelize');
const db= require('../configs/db')
//!orderdetails modle 
const OrderDetail= db.define('OrderDetail',{
    orderDetailId:{type:DataTypes.INTEGER, allowNull:false, autoIncrement:true, primaryKey:true},
    orderId:{type:DataTypes.INTEGER, allowNull:false}
})

module.exports= OrderDetail;