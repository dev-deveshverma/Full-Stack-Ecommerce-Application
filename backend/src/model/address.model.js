const {DataTypes} = require("sequelize");
const db = require('../configs/db');
//? address table schema 
const Address= db.define("Address" , {
      addressId:{type:DataTypes.INTEGER, allowNull:false, primaryKey:true, autoIncrement:true},
       currentAddress:{type:DataTypes.STRING, allowNull:false},
       city:{type:DataTypes.STRING, allowNull:false},
       state:{type:DataTypes.STRING, allowNull:false},
      //  locality:{type:DataTypes.STRING, allowNull:false},
      //  address:{type:DataTypes.STRING, allowNull:false},
      //  city:{type:DataTypes.STRING, allowNull:false},
      //  state:{type:DataTypes.STRING, allowNull:false},
      //  landmark:{type:DataTypes.STRING, allowNull:false},
      //  alternatePhone:{type:DataTypes.STRING, allowNull:true},
      //  addressType:{type:DataTypes.STRING, allowNull:false},
       userId:{type:DataTypes.INTEGER, allowNull:false}
})
module.exports = Address;