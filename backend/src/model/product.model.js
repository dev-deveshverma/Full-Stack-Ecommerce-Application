const {DataTypes} = require("sequelize");
const db= require("../configs/db");

// product model 
const Product= db.define("Product",{
      productId:{type:DataTypes.INTEGER, allowNull:false, primaryKey:true, autoIncrement:true},
      productBrand:{type:DataTypes.STRING,allowNull:true},
      productColor:{type:DataTypes.STRING,allowNull:true},
      productName:{type:DataTypes.STRING,allowNull:false},
      productPrice:{type:DataTypes.FLOAT, allowNull:false,},
      productDiscontPrice:{type:DataTypes.FLOAT, allowNull:false},
      productDescription:{type:DataTypes.TEXT("long"),allowNull:false},
      productStockQuantity:{type:DataTypes.INTEGER, allowNull:false},
      productImages:{type:DataTypes.JSON, allowNull:false},
      categoryId:{type:DataTypes.INTEGER, allowNull:false}
})


module.exports= Product;