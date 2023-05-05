require('dotenv').config()

const express= require('express');
const app= express();
const cors= require('cors');
const sequelize = require('../src/configs/db');
const userController= require('../src/controller/user.controller');
const {login,register}= require("../src/controller/auth.conntroller")
const {uploadSingle, uploadMultiple} = require("../src/middleware/upload")
const addressController = require('../src/controller/address.controller');
const categoryController=require("../src/controller/category.controller")
const subcategoryController=require("../src/controller/sub_category.controller");
const productController = require('../src/controller/product.controller');
const cartController= require('../src/controller/cart.controller');
const orderController=require('../src/controller/order.controller');
const orderDetailController=require("../src/controller/orderDetails.controller");
const orderPaymentController=require("../src/controller/orderPayment.controller")
const bodyParser= require('body-parser')
const path= require('path');
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/uploads',express.static(path.join(__dirname, 'uploads'))) //!making upload folder public for assest
app.use('/users',userController);
app.post('/login',login);
app.post('/register',register);
app.use('/address',addressController);
app.use('/category',categoryController)
app.use('/subcategory',subcategoryController);
app.use('/products',productController)
app.use('/cart',cartController)
app.use('/order',orderController);
app.use('/orderDetails',orderDetailController);
app.use('/orderPayment',orderPaymentController);




const PORT=process.env.PORT ;
app.listen(PORT,async()=>{
    try {
        await sequelize.authenticate();
        console.log(`listening port number ${PORT}`)
        
    } catch (error) {
        console.log('error while connecting to db', error.message)
    }
})

