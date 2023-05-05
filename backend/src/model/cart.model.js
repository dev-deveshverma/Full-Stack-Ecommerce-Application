const {DataTypes} = require('sequelize');
const db= require('../configs/db')
//! cart model 
const Cart= db.define('Cart',{
    cartId:{type:DataTypes.INTEGER, allowNull:false, primaryKey:true, autoIncrement:true},
    userId:{type:DataTypes.INTEGER,allowNull:false},
    productId:{type:DataTypes.INTEGER,allowNull:false},
    productName:{type:DataTypes.STRING,allowNull:false},
    productPrice:{type:DataTypes.FLOAT,allowNull:false},
    productDiscountPrice:{type:DataTypes.FLOAT, allowNull:false},
    productQuantity:{type:DataTypes.FLOAT,allowNull:false},
    productImage:{type:DataTypes.STRING,allowNull:false}

})

module.exports = Cart