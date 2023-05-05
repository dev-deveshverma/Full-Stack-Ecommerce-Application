const {DataTypes} =require('sequelize')
const sequelize= require('../configs/db');
// category model 
const Category= sequelize.define("category",{
    category_Id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    categoryName:{type:DataTypes.STRING, allowNull:false},
    
});

module.exports=Category; 