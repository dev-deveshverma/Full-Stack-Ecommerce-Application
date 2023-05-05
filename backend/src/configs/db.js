const {Sequelize}= require('sequelize');
require('dotenv').config()

//
const sequelize= new Sequelize(process.env.DB,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    dialect:'mysql',
    host:process.env.HOST,
    logging:false
})

//! senchronizing all the tables in the database
sequelize.sync() //! don't pass {force: true} it will erase all the tables
module.exports= sequelize
