const {DataTypes} =require('sequelize')
const sequelize= require('../configs/db');
// user model 
const User= sequelize.define("user",{
    user_Id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    firstName:{type:DataTypes.STRING, allowNull:false},
    lastName:{type:DataTypes.STRING, allowNull:false},
    email:{type:DataTypes.STRING, allowNull:false,unique:true},
    password:{type:DataTypes.STRING, allowNull:false},
    gender:{type:DataTypes.STRING, allowNull:false},
    role:{type:DataTypes.STRING, defaultValue:'user'},
    profile_pic:{type:DataTypes.STRING, allowNull:true},
    is_Active:{type:DataTypes.BOOLEAN, defaultValue:0},
    resetPasswordToken:{type:DataTypes.STRING, allowNull:true , defaultValue:''}

});

module.exports=User; 
