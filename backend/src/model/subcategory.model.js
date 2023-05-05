const {DataTypes} = require("sequelize");
const db= require("../configs/db")

//** subcategory model  */
const Subcategory= db.define("Subcategory",{
     sub_categoryId:{type:DataTypes.INTEGER, primaryKey:true,autoIncrement:true,allowNull:false},
     sub_categoryName:{type:DataTypes.STRING,allowNull:false},
     categoryId:{type:DataTypes.INTEGER,allowNull:false}
})

module.exports= Subcategory;